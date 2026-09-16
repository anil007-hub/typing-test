const texts=[
"The fastest way to improve your typing is to practice regularly with accuracy and patience.",
"Good typing skills help you work faster, communicate clearly, and save valuable time every day.",
"Technology changes quickly, but strong keyboard skills remain useful for school, work, and creativity.",
"Focus on accuracy first. Speed will naturally improve as your fingers become more familiar with the keyboard."
];
const quote=document.querySelector("#quote"),input=document.querySelector("#input"),timeEl=document.querySelector("#time"),wpmEl=document.querySelector("#wpm"),accEl=document.querySelector("#accuracy"),errEl=document.querySelector("#errors"),start=document.querySelector("#start"),restart=document.querySelector("#restart"),result=document.querySelector("#result");
let duration=15,timeLeft=15,running=false,startAt=0,timer=null,text="";
function reset(){clearInterval(timer);running=false;timeLeft=duration;timeEl.textContent=duration;wpmEl.textContent=0;accEl.textContent="100%";errEl.textContent=0;input.value="";input.disabled=false;result.classList.add("hidden");start.textContent="Start Typing";text=texts[Math.floor(Math.random()*texts.length)];render();}
function render(){let typed=input.value;quote.innerHTML="";[...text].forEach((ch,i)=>{let s=document.createElement("span");s.textContent=ch;s.className=i<typed.length?(typed[i]===ch?"correct":"wrong"):(i===typed.length?"current":"pending");quote.appendChild(s)});}
function update(){let typed=input.value,correct=0;for(let i=0;i<typed.length;i++)if(typed[i]===text[i])correct++;let elapsed=Math.max(.1,(Date.now()-startAt)/1000);let wpm=Math.round((correct/5)/(elapsed/60));let acc=typed.length?Math.round(correct/typed.length*100):100;let errors=Math.max(0,typed.length-correct);wpmEl.textContent=wpm;accEl.textContent=acc+"%";errEl.textContent=errors;render();}
function finish(){clearInterval(timer);running=false;input.disabled=true;update();start.textContent="Test Finished";let best=Number(localStorage.getItem("typingBest")||0),score=Number(wpmEl.textContent);if(score>best){best=score;localStorage.setItem("typingBest",best)}result.textContent=`Result: ${score} WPM · ${accEl.textContent} accuracy · Best: ${best} WPM`;result.classList.remove("hidden");}
function begin(){if(running)return;running=true;startAt=Date.now();start.textContent="Typing...";timer=setInterval(()=>{timeLeft=Math.max(0,duration-Math.floor((Date.now()-startAt)/1000));timeEl.textContent=timeLeft;if(timeLeft<=0)finish();},100)}
input.addEventListener("input",()=>{if(!running)begin();update();if(input.value.length>=text.length)finish()});
start.addEventListener("click",()=>{input.focus();if(!running)begin()});restart.addEventListener("click",reset);
document.querySelectorAll(".time").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".time").forEach(x=>x.classList.remove("active"));b.classList.add("active");duration=Number(b.dataset.time);reset()}));
document.querySelector("#themeBtn").addEventListener("click",()=>document.body.classList.toggle("dark"));
reset();