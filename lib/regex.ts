export function removeDiacritics(str: string): string {
  const diacriticsMap: Record<string, RegExp> = {
    a: /[áàảãạăắằẳẵặâấầẩẫậ]/g,
    e: /[éèẻẽẹêếềểễệ]/g,
    i: /[íìỉĩị]/g,
    o: /[óòỏõọôốồổỗộơớờởỡợ]/g,
    u: /[úùủũụưứừửữự]/g,
    y: /[ýỳỷỹỵ]/g,
    d: /[đ]/g,
    c: /[ç]/g,
    n: /[ñ]/g,
  };

  // Loại bỏ dấu tiếng Việt
  for (let letter in diacriticsMap) {
    str = str.replace(diacriticsMap[letter], letter);
  }
  return str;
}
