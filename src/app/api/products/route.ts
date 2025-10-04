import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all products with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('category');
    const featured = searchParams.get('featured');
    const newArrivals = searchParams.get('new_arrivals');
    const bestseller = searchParams.get('bestseller');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `, { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (categoryId) query = query.eq('category_id', categoryId);
    if (featured === 'true') query = query.eq('is_featured', true);
    if (newArrivals === 'true') query = query.eq('is_new_arrival', true);
    if (bestseller === 'true') query = query.eq('is_bestseller', true);
    if (search) query = query.ilike('name', `%${search}%`);

    const { data, error, count } = await query;

    if (error) throw error;

    // Sort images by display_order for each product
    data?.forEach((product: any) => {
      if (product.images) {
        product.images.sort((a: any, b: any) => a.display_order - b.display_order);
      }
    });

    return NextResponse.json({
      success: true,
      products: data,
      total: count,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate slug from name if not provided
    const slug = body.slug || body.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name: body.name,
        slug,
        short_description: body.short_description,
        long_description: body.long_description,
        price: body.price,
        sale_price: body.sale_price,
        sku: body.sku,
        stock_quantity: body.stock_quantity || 0,
        category_id: body.category_id,
        material: body.material,
        dimensions: body.dimensions,
        weight: body.weight,
        color_options: body.color_options,
        specifications: body.specifications || {},
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        is_featured: body.is_featured || false,
        is_new_arrival: body.is_new_arrival || false,
        is_bestseller: body.is_bestseller || false,
        has_video: body.has_video || false,
        has_3d_model: body.has_3d_model || false
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      product
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}