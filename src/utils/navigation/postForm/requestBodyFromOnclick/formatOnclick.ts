export const formatOnclick = (onclick: string | undefined | null): BodyInit | undefined => {
    const str = onclick?.substring(onclick.indexOf('{'), onclick.indexOf('}') + 1).replace(/'/g, '"')
    if(str){
        return JSON.parse(str)
    }
    }