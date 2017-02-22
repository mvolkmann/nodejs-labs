async function foo() {
  return 1;
}

async function bar() {
  return 2;
}

async function baz() {
  return new Promise(resolve => resolve(3));
}

async function demo() {
  try {
    const v1 = await foo();
    console.log('v1 =', v1);
    const v2 = await bar();
    console.log('v2 =', v2);
    const v3 = await baz();
    console.log('v3 =', v3);
  } catch (e) {
    console.error(e);
  }
}

demo();
