#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("world"));
}

// An initialization function that registers the "hello" method.
void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

// Export the initialization function for the "hello" module
// using the NODE_MODULE macro defined in node.h.
NODE_MODULE(hello, init)
