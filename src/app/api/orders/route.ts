import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderNumber = `ORD-${Date.now()}`;

    // Calculate totals
    const subtotal = body.items.reduce(
      (sum: number, item: any) => sum + (item.unit_price * item.quantity),
      0
    );

    const totalAmount = subtotal + 
      (body.shipping_cost || 0) + 
      (body.tax_amount || 0) - 
      (body.discount_amount || 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        shipping_address: body.shipping_address,
        billing_address: body.billing_address || body.shipping_address,
        subtotal,
        shipping_cost: body.shipping_cost || 0,
        tax_amount: body.tax_amount || 0,
        discount_amount: body.discount_amount || 0,
        total_amount: totalAmount,
        payment_method: body.payment_method,
        customer_notes: body.customer_notes,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      variant_info: item.variant_info,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update product stock
    for (const item of body.items) {
      await supabase.rpc('decrement_stock', {
        product_id: item.product_id,
        quantity: item.quantity
      });
    }

    return NextResponse.json({
      success: true,
      order
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET orders (with optional email filter for customer orders)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          *,
          product:products(*)
        )
      `)
      .order('created_at', { ascending: false });

    if (email) {
      query = query.eq('customer_email', email);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      orders: data
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}