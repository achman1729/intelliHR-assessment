

export const stringToNumber = (runtime: string): number => {
    let strNum: string[] = ['']
    if(runtime)
    {
      strNum = runtime.split(" ")

    }
    return parseInt(strNum[0])
  }

export const mostWatchedGenre = (genres: string[]): string => {
    let arr = genres.join()
  
    let splitArr = arr.split(",")
  
    // let current: number = 0;
    let max: number = 0;
    let mostCommonGenre: string = "";
    let i: number;
  
    for (i = 0; i < splitArr.length - 1; i++) {
      let current: number = 1;
      let j: number;
  
      for (j = i + 1; j < splitArr.length; j++) {
        if (splitArr[i] === splitArr[j]) {
          current++;
        }
      }
      if (current > max) {
        max = current;
        mostCommonGenre = splitArr[i];
      }
    }
    return mostCommonGenre;
  }