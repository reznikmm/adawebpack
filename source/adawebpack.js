
adawebpack = {

  __gnat_put_int: function (item) { console.log(item); },
  __gnat_put_char: function (item) { console.log(String.fromCharCode(item)); },

  __adawebpack__is_instance_of: function(identifier, address, size)
  {
    return from_wasm_object_identifier(identifier) instanceof window[string_to_js(address, size)];
  },

  __adawebpack__wasm__object_release: function (identifier)
  { console.log('Object released ' + identifier);
  },

  __adawebpack__bom__window__document: function ()
  {
    return to_wasm_object_identifier(window.document);
  },

  __adawebpack__dom__Document__getElementById: function (identifier, address, length)
  {
    return to_wasm_object_identifier(from_wasm_object_identifier(identifier).getElementById(string_to_js(address, length)));
  },

  __adawebpack__dom__Node__addEventListener: function (identifier, type_address, type_size, callback, capture)
  {
    from_wasm_object_identifier(identifier).addEventListener
     (string_to_js(type_address, type_size),
      function(e) { instance.exports.__adawebpack__dom__Node__dispatch_event (callback,to_wasm_object_identifier(e)); },
      capture !== 0);
  },

  __adawebpack__html__Button__disabled_setter: function(identifier,to) {
    from_wasm_object_identifier (identifier).disabled = (to !== 0);
  },

  __adawebpack__html__Button__disabled_getter: function(identifier) {
    return +from_wasm_object_identifier(identifier).disabled;
  },

  __adawebpack__html__Canvas__getContext: function(identifier,address,size) {
    return to_wasm_object_identifier(from_wasm_object_identifier(identifier).getContext(string_to_js(address,size)));
  },

  __adawebpack__html__Element__hidden_setter: function(identifier,to) {
    from_wasm_object_identifier (identifier).hidden = (to !== 0);
  },

  __adawebpack__html__Element__hidden_getter: function(identifier) {
    return +from_wasm_object_identifier(identifier).hidden;
  },

  __adawebpack__webgl__RenderingContext__attachShader: function(context_identifier,program_identifier,shader_identifier) {
    from_wasm_object_identifier(context_identifier).attachShader(from_wasm_object_identifier(program_identifier), from_wasm_object_identifier(shader_identifier));
  },

  __adawebpack__webgl__RenderingContext__bindBuffer: function(context_identifier,target,buffer_identifier) {
    from_wasm_object_identifier(context_identifier).bindBuffer(target, from_wasm_object_identifier(buffer_identifier));
  },

  __adawebpack__webgl__RenderingContext__bufferData: function(context_identifier,target,size,data,usage) {
    from_wasm_object_identifier(context_identifier).bufferData(target, new Uint8Array(instance.exports.memory.buffer,data,size), usage);
  },

  __adawebpack__webgl__RenderingContext__clear: function(identifier,mask) {
    from_wasm_object_identifier(identifier).clear(mask);
  },

  __adawebpack__webgl__RenderingContext__clearColor: function(identifier,red,green,blue,alpha) {
    from_wasm_object_identifier(identifier).clearColor(red,green,blue,alpha);
  },

  __adawebpack__webgl__RenderingContext__compileShader: function(context_identifier,shader_identifier) {
    from_wasm_object_identifier(context_identifier).compileShader(from_wasm_object_identifier(shader_identifier));
  },

  __adawebpack__webgl__RenderingContext__createBuffer: function(identifier) {
    return to_wasm_object_identifier(from_wasm_object_identifier(identifier).createBuffer());
  },

  __adawebpack__webgl__RenderingContext__createProgram: function(identifier) {
    return to_wasm_object_identifier(from_wasm_object_identifier(identifier).createProgram());
  },

  __adawebpack__webgl__RenderingContext__createShader: function(identifier,type) {
    return to_wasm_object_identifier(from_wasm_object_identifier(identifier).createShader(type));
  },

  __adawebpack__webgl__RenderingContext__drawArrays: function(identifier,mode,first,count) {
    from_wasm_object_identifier(identifier).drawArrays(mode,first,count);
  },

  __adawebpack__webgl__RenderingContext__getAttribLocation: function(context_identifier,program_identifier,name_address,name_size) {
    return from_wasm_object_identifier(context_identifier).getAttribLocation(from_wasm_object_identifier(program_identifier), string_to_js(name_address, name_size));
  },

  __adawebpack__webgl__RenderingContext__getUniformLocation: function(context_identifier,program_identifier,name_address,name_size) {
    return to_wasm_object_identifier(from_wasm_object_identifier(context_identifier).getUniformLocation(from_wasm_object_identifier(program_identifier),string_to_js(name_address,name_size)));
  },

  __adawebpack__webgl__RenderingContext__linkProgram: function(context_identifier,program_identifier) {
    from_wasm_object_identifier(context_identifier).linkProgram(from_wasm_object_identifier(program_identifier));
  },

  __adawebpack__webgl__RenderingContext__shaderSource: function(context_identifier,shader_identifier,source_address,source_size) {
    from_wasm_object_identifier(context_identifier).shaderSource(from_wasm_object_identifier(shader_identifier),string_to_js(source_address,source_size));
  }

};

var obj2id = new Map();
var id2obj = new Map();
var last_id = 0;

function to_wasm_object_identifier(obj)
{
  if (obj2id.has(obj))
  {
    return obj2id.get(obj);
  } else {
    last_id++;
    obj2id.set(obj, last_id);
    id2obj.set(last_id, obj);
    return last_id;
  }
}

function from_wasm_object_identifier(identifier)
{
  return id2obj.get(identifier);
}

function string_to_js(address, size)
{
  return String.fromCharCode.apply(null, new Uint16Array(instance.exports.memory.buffer, address, size));
}
