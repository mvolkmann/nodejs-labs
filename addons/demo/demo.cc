#include <v8.h>
#include <node.h>

// TODO: When are these needed?
//#include <node_buffer.h>
//#include <node_version.h>
//#include <stdio.h>
//#include <string.h>

using namespace v8;

Handle<Value> Throw(const char* msg) {
  return ThrowException(Exception::Error(String::New(msg)));
}

// TODO: Decide how to use this.
Handle<Value> VerifyArgCount(const Arguments& args, int expected) {
  int actual = args.Length();
  if (actual != expected) {
    char* msg = (char*) malloc(100);
    sprintf(msg, "expected %d argument(s), but received %d\n", expected, actual);
    return Throw(msg);
  }
}

Handle<Value> DumpProps(const Arguments& args) {
  if (!args[0]->IsObject()) {
    return Throw("expected object argument");
  }

  printf("DumpProps entered\n");
  Local<Object> obj = args[0]->ToObject();
  Local<Array> props = obj->GetOwnPropertyNames();
  uint32_t len = props->Length();
  printf("obj has %d properties\n", len);

  for (uint32_t i = 0; i < len; i++) {
    Local<Value> key = props->Get(i);
    String::Utf8Value name(key);
    printf("prop %d is %s\n", i, *name);

    Local<Value> value = obj->Get(key);
    if (value->IsBoolean()) {
      bool b = value->BooleanValue();
      printf("  boolean is %s\n", b ? "true" : "false");
    } else if (value->IsInt32()) {
      int32_t i = value->Int32Value();
      printf("  int32 is %d\n", i);
    } else if (value->IsNumber()) {
      double d = value->NumberValue();
      printf("  double is %f\n", d);
    } else if (value->IsString()) {
      // TODO: Is this really the best way to get a C string from a Local<String>?
      //char* s = Local<String>::Cast(value)->Value();
      String::Utf8Value utfStr(value);
      char* s = (char*) *utfStr;
      // s becomes a dangling pointer if utfStr goes out of scope!
      printf("  string is %s\n", s);
    } else if (value->IsDate()) {
      //double ms = Local<Date>::Cast(value)->NumberValue();
      double ms = Local<Date>::Cast(value)->NumberValue();
      printf("  milliseconds is %f\n", ms);
    }
  }
}

// Arguments is an array-like object.
// TODO: Still need examples of accepting and returning these types of values:
// date, time, regexp, object
Handle<Value> Greet(const Arguments& args) {
  HandleScope scope;

  printf("args.length = %d\n", args.Length());

  int count = args.Length();
  if (count != 1) {
    char* msg = (char*) malloc(100);
    sprintf(msg, "expected 1 argument, but received %d\n", count);
    return Throw(msg);
  }

  if (!args[0]->IsString()) {
    return Throw("expected string argument");
  }

  String::Utf8Value utfStr(args[0]);
  printf("UTF8 string = %s\n", *utfStr);

  char* cStr = (char*) *utfStr;
  printf("C string = %s\n", cStr);
  
  Local<String> result =
    String::Concat(String::New("Hello, "), args[0]->ToString());
  return scope.Close(result);
}

Handle<Value> Not(const Arguments& args) {
  HandleScope scope;

  Local<Value> arg = args[0];
  if (!arg->IsBoolean()) {
    return Throw("expected boolean argument");
  }

  bool b = !arg->BooleanValue();

  return scope.Close(Boolean::New(b));
}

// Sums integers
Handle<Value> Sum(const Arguments& args) {
  HandleScope scope;

  int sum = 0;
  int len = args.Length();
  for (int i = 0; i < len; i++) {
    int n = args[i]->IntegerValue(); // truncates double values
    sum += n;
  }

  return scope.Close(Integer::New(sum));
}

// Sums array of integers
Handle<Value> SumA(const Arguments& args) {
  HandleScope scope;

  if (!args[0]->IsArray()) {
    return Throw("expected array argument");
  }

  Local<Array> arr = Local<Array>::Cast(args[0]);  
  int sum = 0;
  uint32_t len = arr->Length();
  for (uint32_t i = 0; i < len; i++) {
    Local<Value> v = arr->Get(i);
    if (v->IsInt32()) {
      int n = v->Int32Value();
      sum += n;
    } else {
      printf("array element isn't an integer!\n");
    }
  }

  return scope.Close(Integer::New(sum));
}

// Sums doubles
Handle<Value> SumD(const Arguments& args) {
  HandleScope scope;

  double sum = 0;
  int len = args.Length();
  for (int i = 0; i < len; i++) {
    double n = args[i]->NumberValue();
    sum += n;
  }

  Local<Number> result = Number::New(sum);
  return scope.Close(result);
}

Handle<Value> TakeFn(const Arguments& args) {
  //HandleScope scope; // TODO: need this?

  if (!args[0]->IsFunction()) {
    return Throw("expected function argument");
  }

  Local<Function> fn = Local<Function>::Cast(args[0]);  

  int size = 2;
  Local<Value> fnArgs[size];
  fnArgs[0] = Local<Value>::New(Null()); // no error
  //fnArgs[0] = String::New("something bad happened");
  fnArgs[1] = Integer::New(19);

  //fn->Call(args.This(), 0, 0); // to pass no arguments
  fn->Call(args.This(), size, fnArgs);

  // TODO: Need to return anything or close the scope?
  //scope.Close();
}

// An initialization function that registers the methods.
void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "dumpProps", DumpProps);
  NODE_SET_METHOD(exports, "greet", Greet);
  NODE_SET_METHOD(exports, "not", Not);
  NODE_SET_METHOD(exports, "sum", Sum);
  NODE_SET_METHOD(exports, "suma", SumA);
  NODE_SET_METHOD(exports, "sumd", SumD);
  NODE_SET_METHOD(exports, "takeFn", TakeFn);
}

// Export the initialization function for the "demo" module
// using the NODE_MODULE macro defined in node.h.
NODE_MODULE(demo, init)
