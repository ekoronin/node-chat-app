const expect = require("expect");
const {isRealString} = require("./validation.js");

describe("Tests isRealString", ()=>{
  it("should NOT allow non-string values", ()=>{
    var num = 5;
    var obj = {hello: "world"};
    var arr = [1,2,3];

    expect(isRealString(num)).toBe(false);
    expect(isRealString(obj)).toBe(false);
    expect(isRealString(arr)).toBe(false);
  });

  it("should NOT allow string with only spaces", ()=>{
    var str1 = "   ";
    var str2 = "  \n\t  ";

    expect(isRealString(str1)).toBe(false);
    expect(isRealString(str2)).toBe(false);
  });

  it("it should ALLOW strings with non-space chars", ()=>{
    var str = "Helko, world";

    expect(isRealString(str)).toBe(true);
  });
});
