function fixUrl(url: string): string {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:1178' + url
  } else {
    return url
  }
}

function fixImgSrcPath(image: string) {
  if (image.startsWith('https')) {
    return image
  } else {
    return fixUrl(`/img/${image}`)
  }
}

export { fixUrl, fixImgSrcPath }
