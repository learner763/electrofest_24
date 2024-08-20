document.addEventListener('DOMContentLoaded', () => {
    fetch('/signed-in-users')
      .then(response => response.json())
      .then(users => {
        let div=document.getElementById("Registrations")
        let cat=document.getElementsByClassName("cat")
        let info=document.createElement("div")
        info.style.display="flex",info.style.flexDirection="row"
        info.style.justifyContent="space-around"
        info.style.alignContent="center"
        info.style.flexWrap="wrap"
        div.appendChild(info)
        let events=["Logic!","Wars!","SOC!","Route!","Wired!","Tekken!","Fifa!","Valorant!"]
        let Logic=[],Wars=[],SOC=[],Route=[],Wired=[],Tekken=[],Fifa=[],Valorant=[]
        let arrays=[Logic,Wars,SOC,Route,Wired,Tekken,Fifa,Valorant]
        for(let i=0;i<users.length;i++)
        {

          for(let j=0;j<events.length;j++)
          {

          if(users[i].endsWith(events[j]))
          {
            for(let k=users[i].length-events[i].length+1;k<users[i].length;k++)
            {
              users[i][k]=""
            }

            arrays[j].push(users[i])
          }
          }
        }
        let  w=""
        let arrays_=[[],[],[],[],[],[],[],[]]
        for(let i=0;i<arrays.length;i++)
        {
          for(let j=0;j<arrays[i].length;j++)
          {
            for(let k=0;k<arrays[i][j].length;k++)
            {
            if(arrays[i][j][k]=="!")
            {
                arrays_[i].push(w)      
                w=""
            }
            else{
                w+=arrays[i][j][k]
            }
        }}}    
        for(let i=0;i<cat.length;i++)
          {
            cat[i].style.cursor="pointer"
      }
    for(let i=0;i<cat.length;i++)
    {
      cat[i].addEventListener("click",function()
    {
    for(let i=0;i<cat.length;i++)
    {
      cat[i].style.color="yellow"
    }
    cat[i].style.color="white"
  
    if([0,5,6,7].includes(i))
    {
    info.innerHTML=""
    for(let j=0;j<arrays_[i].length/5;j++)
    {
    
    let e=document.createElement("label")
    e.style.margin="10px"
    e.style.color="white"
    e.style.borderRadius="5px"
    e.style.backgroundColor="darkgreen"
    e.style.border="white solid"
    e.innerHTML=arrays_[i][j*5]+"<br>"+"("+arrays_[i][j*5+1]+")"
    info.appendChild(e)
    
  }
}

else{

    info.innerHTML=""
    for(let j=0;j<arrays_[i].length/11;j++)
    {
    
    let e=document.createElement("label")
    e.style.margin="10px"
    e.style.color="white"
    e.style.borderRadius="5px"
    e.style.border="white solid"
    e.style.backgroundColor="darkgreen"
    e.innerHTML=arrays_[i][j*11+3]+"<br>"+"1-"+arrays_[i][j*11]+"("+arrays_[i][j*11+1]+")"+"<br>"+"2-"+arrays_[i][j*11+4]+"("+arrays_[i][j*11+5]+")"+"<br>"+"3-"+arrays_[i][j*11+6]+"("+arrays_[i][j*11+7]+")"+"<br>"+"4-"+arrays_[i][j*11+8]+"("+arrays_[i][j*11+9]+")"
    info.appendChild(e)
    
  }
}})
}
        
      })
      .catch(error => console.error('Error fetching signed-in users:', error));
  });
  