let numberOfCell=20;
let data=[[],[],[],[]];
let randomNumber;
let randomData=['🍩','🧂','☀','💧','🌷','🍄','A','T','U','H','W','M','I','V','O','X','Y','⭐','!','😁','💙','🌹','🔵','🔺','🟥','🔹','😑','😎','😈','👽','🥎','🎀','☎','🎁'];
let init=[];
let rand=0;
let select1=0,select2=0;
let bufferData,bufferElement;
let scoreEl=document.querySelector('.score');
let score=0;
let timerBarEl=document.querySelector('.round-time-bar');
let finishEl=document.querySelector('.finish');
let timer;
let startAgainEl=document.querySelector('.start-again');
let expireClasses=[];

setTimeout(()=>
{
    document.querySelector('main').style.display='none';
    finishEl.style.display='block';
    document.querySelector('.your-score').textContent="Your Score is : "+String(score);

},30000)

let secondary="#eb3b5a",primary="#20bf6b";


// for(let i=0;i<numberOfCell/2;i++)
// {
//     randomNumber=65+Math.floor(Math.random()*26);
//     randomData.push(String.fromCharCode(randomNumber));
// }
//console.log(randomData);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}



shuffle(randomData);

for(let i=0,i2;i<4;i++)
{
    for(let j=0,j2;j<5;j++)
    {

       if(init.includes((i)*5+j))
       {

           continue;

       }
       else
       {
           data[i][j]=randomData[rand];
           rand++;
           init.push((i)*5+j);
       }

        do
        {
            i2=Math.floor(Math.random()*4);
            j2=Math.floor(Math.random()*5);

        }while(init.includes(((i2)*5+j2)));

        data[i2][j2]=randomData[rand-1];
        init.push((i2)*5+j2);


    }
}
// for(let i=0;i<4;i++)
// {
//     for(let j=0;j<5;j++)
//     {
//         // let className=`cel-${i}-${j}`;
//         // let thisCell=document.querySelector('.'+className);
//         document.querySelectorAll('.cel').forEach((item)=>
//         {
//             item.classList.add('rotate1');
//         })
//     }
// }



setTimeout(()=>
{
    scoreEl.style.display='none';
},1000)


startAgainEl.addEventListener('click',(e)=>
{
    location.reload();
})

document.addEventListener('click',(e)=>
{
    if(e.target.getAttribute('class'))
    {
        if(e.target.getAttribute('class').includes('cel'))
        {
            if (!expireClasses.includes(e.target.getAttribute('class').split(' ')[1]))
            {



                let classes=e.target.getAttribute('class');
                classes=classes.split(' ');
                let ind=classes[1].split('-');
                let i,j;
                i=ind[1]-1;
                j=ind[2]-1;
                ind='cel-'+ind[1]+"-"+ind[2];
                let currentCell=document.querySelector('.'+ind);
                currentCell.style.backgroundColor=secondary;

                currentCell.textContent=data[i][j];
                // currentCell.style.transform="scale(1, -1)";
                setTimeout(()=>
                {
                    currentCell.classList.add('flip-vertical-right');

                },10)


                if(!select1)
                {

                    select1=1;
                    bufferData=currentCell.textContent;
                    bufferElement=currentCell;

                }
                else
                {
                    if(currentCell.textContent===bufferElement.textContent && currentCell!==bufferElement)
                    {
                        score++;
                        scoreEl.textContent=String(score);
                        scoreEl.style.display='block';
                        setTimeout(()=>
                        {

                            currentCell.style.backgroundColor='#000';
                            bufferElement.style.backgroundColor='#000';
                            currentCell.textContent="";
                            bufferElement.textContent="";
                            expireClasses.push(currentCell.getAttribute('class').split(' ')[1]);
                            expireClasses.push(bufferElement.getAttribute('class').split(' ')[1]);


                            scoreEl.style.display='none';
                            currentCell.classList.add('flip-vertical-left');
                            bufferElement.classList.add('flip-vertical-left')

                        },500);
                    }
                    else
                    {
                        setTimeout(()=>
                        {
                            currentCell.style.backgroundColor=primary;
                            bufferElement.style.backgroundColor=primary;
                            currentCell.textContent="";
                            bufferElement.textContent="";
                            currentCell.classList.add('flip-vertical-left');
                            bufferElement.classList.add('flip-vertical-left');

                        },500);


                    }


                    select1=0;

                }

                bufferElement.classList.remove('flip-vertical-right');
                bufferElement.classList.remove('flip-vertical-left');

                setTimeout(()=>
                {
                    currentCell.classList.remove('flip-vertical-right');
                    currentCell.classList.remove('flip-vertical-left');

                },1000)


            }


        }
    }
})


