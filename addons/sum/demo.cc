#include <v8.h>
#include <node.h>

using namespace v8;

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

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "sum", Sum);
}

NODE_MODULE(demo, init)
