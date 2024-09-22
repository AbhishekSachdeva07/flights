const formatTime = (hour,min,sec)=>{
    const hh = String(hour).padStart(2,'0');
    const mi = String(min).padStart(2,'0');
    const se = String(sec).padStart(2,'0');
    return `${hh}:${mi}:${se}`;
}

const getplustime = (hour,min,sec)=>{
    min+=40;
    if(min>=60){
        min-=60;
        hour+=1;
    }
    return formatTime(hour,min,sec);
}

const getminustime = (hour,min,sec)=>{
    min-=40;
    if(min<=0){
        min+=60;
        hour-=1;
    }
    return formatTime(hour,min,sec);
}

export default {getplustime,getminustime};