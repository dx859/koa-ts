export default function GenarateDecorator(
  middleware: any,
  hasParams: boolean = false,
) {
  return function (..._args: any[]) {
    return function (
      _target: any,
      _propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      descriptor.value = Array.isArray(descriptor.value)
        ? descriptor.value
        : [descriptor.value];
      descriptor.value.unshift(hasParams ? middleware(..._args) : middleware);
    };
  };
}
