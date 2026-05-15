export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset!)
  formData.append('folder', 'revaldo-portfolio')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  const data = await response.json()

  if (!response.ok) throw new Error(data.error?.message || 'Upload failed')

  // Return URL dengan auto compress + format + resize
  const optimizedUrl = data.secure_url.replace(
    '/upload/',
    '/upload/q_auto,f_auto,w_1200/'
  )

  return optimizedUrl
}