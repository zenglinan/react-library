import { useEffect } from "react";
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            //contains可以检测参数是否为调用对象的后代节点
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
