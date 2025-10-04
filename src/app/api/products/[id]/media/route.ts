import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { uploadMultipleImages, uploadProductVideo, upload3DModel } from '@/lib/upload';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const mediaType = formData.get('type') as string;

    if (mediaType === 'images') {
      const files = formData.getAll('images') as File[];
      if (!files.length) {
        return NextResponse.json(
          { success: false, error: 'No files provided' },
          { status: 400 }
        );
      }

      const uploadResults = await uploadMultipleImages(files, params.id);
      
      const imageRecords = uploadResults
        .filter(result => !result.error)
        .map((result, index) => ({
          product_id: params.id,
          image_url: result.url,
          alt_text: `Product image ${index + 1}`,
          display_order: index,
          is_primary: index === 0
        }));

      const { data, error } = await supabase
        .from('product_images')
        .insert(imageRecords)
        .select();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        images: data
      }, { status: 201 });
    }

    if (mediaType === 'video') {
      const file = formData.get('video') as File;
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No video file provided' },
          { status: 400 }
        );
      }

      const result = await uploadProductVideo(file, params.id);
      if (result.error) throw new Error(result.error);

      const { data, error } = await supabase
        .from('products')
        .update({
          has_video: true,
          video_url: result.url
        })
        .eq('id', params.id)
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        product: data
      });
    }

    if (mediaType === '3d_model') {
      const file = formData.get('model') as File;
      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No 3D model file provided' },
          { status: 400 }
        );
      }

      const result = await upload3DModel(file, params.id);
      if (result.error) throw new Error(result.error);

      const { data, error } = await supabase
        .from('products')
        .update({
          has_3d_model: true,
          model_3d_url: result.url
        })
        .eq('id', params.id)
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        product: data
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid media type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}