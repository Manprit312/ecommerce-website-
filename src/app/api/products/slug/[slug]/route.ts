import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single product by SLUG (for frontend product pages)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
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
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    // Sort images by display_order
    if (data.images) {
      data.images.sort((a: any, b: any) => a.display_order - b.display_order);
    }

    // Sort reviews by date
    if (data.reviews) {
      data.reviews.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
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