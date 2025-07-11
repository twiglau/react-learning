

export async function likeApi(isLike:boolean): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(Math.random() > 0.5) {
        resolve(isLike)
      } else {
        reject(isLike)
      }
    }, 1000)
  });
}