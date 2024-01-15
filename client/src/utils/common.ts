export const isDuplicated = (array: any[], props: string) => {
  const uniqueIds: any[] = [];

  const unique = array.filter((element) => {
    console.log("🚀 ~ file: common.ts:5 ~ unique ~ element:", element[props]);
    const isDuplicate = uniqueIds.includes(element[props]);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  return unique;
};
