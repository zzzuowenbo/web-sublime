const buf1 = Buffer.from('a');
console.log(buf1);

const buf2 = Buffer.from('人');
console.log(buf2);

const buf3 = Buffer.alloc(5);
console.log(buf3);
buf3[0] = 12;
console.log(buf3);
buf3[1] = 0xab;
console.log(buf3);
buf3[2] = 0x12;
console.log(buf3);

const buf4 = Buffer.alloc(3);
buf4[0] = 0xe4;
buf4[1] = 0xba;
buf4[2] = 0xba;
console.log(buf4);
console.log(buf4.toString());