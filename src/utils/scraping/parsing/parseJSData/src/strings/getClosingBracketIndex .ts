export const getClosingBracketIndex = (jsObjectString: string, i: number, opening: "[" | "{"):number => {
    const closing = (() => {
        switch(opening){
            case "[":
                return "]";
            default:
                return "}";
        }
    })()
    let out = i;
    const stack = [opening]
    while(stack.length > 0 && out < jsObjectString.length){
        out++;
        if(jsObjectString[out] === opening){
            stack.push(opening)
        } else if(jsObjectString[out] === closing){
            stack.pop();
        }
    }
    out++;
    return out;
}