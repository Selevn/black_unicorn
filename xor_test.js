str1 = "b1565820a5cdac40e0520d23f9d0b1497f240ddc51d72eac6423d97d952d444f";//msg
str2 = "be3b6f4cbef174ae058ae62c541ebc02c6efc9bc8a1ca1a8f8110b0535dc97a6";//a key
str3 = "4ff5a360d294c0a13a3d6435a9fea8a77ab38772fcaca0ecc260ae0fa0b3e730";//b key
console.log("Alice secret message:");
console.log(str1);
str1 = crypt(str1,str2);
console.log('-------')
console.log("Alice crypt with her key and send");
console.log(str1);
str1 = crypt(str1,str3);

console.log("Bob crypt with his key and send");
console.log(str1);
str1 = crypt(str1,str2);

console.log("Alice decrypt with her key and send");
console.log(str1);

str1 = crypt(str1,str3);
console.log('-------')
console.log("Bob decrypt with his key and got:");
console.log(str1);




function crypt(s1,s2)
{
    sout='';
    for(i=0;i<str1.length;i++)
    {
        sout+=String.fromCharCode(s1.charCodeAt(i)^s2.charCodeAt(i));
    }
    return sout;
}