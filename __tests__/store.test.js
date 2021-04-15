const store = require('../src/store.js');

const map = {
  tj: '546b0590-9706-5528-91a8-7f7bfe385ae1',
  autumn: '91fb6427-6c08-5b21-aded-26660f7d81ba',
  Autumn: '36da4648-2340-5731-9405-6bac9a54cb3a',
  BobBelcher: '1c96960c-f889-528b-afc5-6765d2dceff0',
};

describe('Encoding', () => {
  it('should properly encode', () => {
    const db = store();
    expect(db.encodeString('tj')).toEqual(map.tj);
    expect(db.encodeString('Bob Belcher')).toEqual(map.BobBelcher);
  });

  it('should trim before encoding', () => {
    const db = store();
    expect(db.encodeString('tj')).toEqual(map.tj);
    expect(db.encodeString('tj ')).toEqual(map.tj);
    expect(db.encodeString(' tj ')).toEqual(map.tj);
    expect(db.encodeString(' tj')).toEqual(map.tj);
    expect(db.encodeString(' tj   ')).toEqual(map.tj);
  });

  it('should be case sensitive', () => {
    const db = store();
    const res1 = db.encodeString('autumn');
    const res2 = db.encodeString('Autumn');
    expect(res1).toEqual(map.autumn);
    expect(res2).toEqual(map.Autumn);
    expect(res1).not.toEqual(res2);
  });
});

describe('Store', () => {
  it('should return 0 if string not seen', async () => {
    const db = store();
    const res = await db.get('Bob Belcher');
    expect(res).toBe(0);
  });

  it('should return count for strings seen strings', async () => {
    const db = store();

    // submit a Bob Belcher
    const res1 = await db.insertOrUpdate('Bob Belcher');
    expect(res1).toEqual({ [map.BobBelcher]: 1 });

    // check if Bob Belcher was saved
    const res2 = await db.get('Bob Belcher');
    expect(res2).toBe(1);

    // submit another Bob Belcher
    await db.insertOrUpdate('Bob Belcher');

    // make sure there are two Bobs
    const res3 = await db.get('Bob Belcher');
    expect(res3).toBe(2);
  });

  it('getAll(): should return all records', async () => {
    const db = store();

    // create a bunch of records
    await db.insertOrUpdate('tj');
    await db.insertOrUpdate('Bob Belcher');
    await db.insertOrUpdate('Bob Belcher');
    await db.insertOrUpdate('Autumn');

    // get all db records
    const res = await db.getAll();

    expect(res).toEqual({
      [map.tj]: 1,
      [map.BobBelcher]: 2,
      [map.Autumn]: 1,
      total: 4,
    });
  });
});
