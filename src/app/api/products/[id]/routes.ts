import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*),
        reviews:product_reviews(*)
      `)
      .eq('id', params.id)
      .single();

    if (error) throw error;

    // Sort images by display_order
    if (data.images) {
      data.images.sort((a: any, b: any) => a.display_order - b.display_order);
    }

    return NextResponse.json({
      success: true,
      product: data
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('products')
      .update({
        name: body.name,
        slug: body.slug,
        short_description: body.short_description,
        long_description: body.long_description,
        price: body.price,
        sale_price: body.sale_price,
        stock_quantity: body.stock_quantity,
        category_id: body.category_id,
        material: body.material,
        dimensions: body.dimensions,
        specifications: body.specifications,
        is_featured: body.is_featured,
        is_new_arrival: body.is_new_arrival,
        is_bestseller: body.is_bestseller,
        is_active: body.is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      product: data
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}