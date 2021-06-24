export interface Exercise{
    call:string;
    creator:string;
    code:string;
    examples:Example[];
    solutions: Solution[];
    level:string;
    created:Date;
    name:string;
    section:string;
    details:string;
}

interface Example{
    call:string;
    result:string;
    comment:string
}

interface Solution{
    outputs: Output[];
    code:"string";
    inputs: Input[];
}

interface Output{
    name:string;
    type:string;
}

interface Input{
    name:string;
    type:string;
}