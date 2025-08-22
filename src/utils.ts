export function random (len: number){
    let ans = "";
    let options = "qwertyasdfjkl12345678";
    let length = options.length;

    for(let i=0 ; i<length; i++){
        ans+= options[Math.floor(Math.random()* length )];


    }
    return ans;
}