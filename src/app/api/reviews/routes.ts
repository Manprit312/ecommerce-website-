import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST create review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('product_reviews')
      .insert({
        product_id: body.product_id,
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        rating: body.rating,
        review_text: body.review_text,
        is_verified: false,
        is_approved: false
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      review: data
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

// GET reviews for a product
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('product_id');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      reviews: data
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}