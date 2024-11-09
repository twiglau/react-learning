import { use } from "react";
const _api2 = new Promise((resolve) => {
  resolve({ value: "_api2" });
});
// 已经有了结果状态的 Promise 对象

export default function Good() {
  const result = use(_api2);
  return (
    <>
      <div>{result.value}</div>
    </>
  );
}
