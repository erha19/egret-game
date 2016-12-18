class shapeRecognition{

        public simplify(arr:[number,number][]):[number,number][][]{
            let ans:[number,number][][]=[];
            let first:boolean=true;
            let k:number;
            let start_point:[number,number];
            let size=1;
            for(let i=1;i<arr.length;i++){
                let a:[number,number]=arr[i-1];
                let b:[number,number]=arr[i];
                let new_k=Math.atan2(b[1]-a[1],b[0]-a[0]);
                if(first==true)
                {
                    start_point=a;
                    first=false;
                    size=1;
                }
                else if(Math.abs(k-new_k)>1)    
                {
                    first=true;
                    if(size>5) 
                    {
                        ans.push([start_point,a]);
                    }
                }
                size++;
                k=new_k;
            }
            if(first==false && size>5){
                ans.push([start_point,arr[arr.length-1]]);
            }
            return ans;
        }

        public quanrant(line:[number,number][]):number{
            let k:number=Math.atan2(line[0][1]-line[1][1],line[1][0]-line[0][0]);
            let PI=Math.acos(-1);
            let eps=0.2;
            if(k<0) k=2*PI+k;
            if(Math.abs(k)<=eps || Math.abs(k-PI)<=eps)
                return -1;
            else if(Math.abs(PI/2-k)<=eps || Math.abs(PI*3/2-k)<=eps)
                return -2;
            else if(-eps<=k && k<=PI/2+eps)
                return 0;
            else if(PI/2-eps<k && k<PI+eps)
                return 1;
            else if(PI-eps<k && k<PI*3/2+eps)
                return 2;
            else 
                return 3;
        }

        public judge(arr:[number,number][][]):number{
            let ans:number[]=[];
            for(let i=0;i<arr.length;i++)
            {
                ans.push(this.quanrant(arr[i]));
            }

            if(ans.length==1)
            {
                if(ans[0]==-1)
                return shapeType.HORIZONTAL;
                else if(ans[0]==-2)
                    return shapeType.VERTICAL;
                else
                    return shapeType.UNKONW_TYPE;
            }
            else if(ans.length==2)
            {
                if(ans[0]==3 && ans[1]==0)
                    return shapeType.LETTER_V;
                else if(ans[0]==0 && (ans[1]==3|| ans[1]==-2))
                    return shapeType.REVERSED_LETTER_V;
            }
            else if(ans.length==3)
            {
                if(ans[0]==2 && ans[2]==2)
                    return shapeType.FLASH;
                else if(ans[0]==2 && ans[2]==1)
                    // return shapeType.TRIANGLE;
                    return shapeType.UNKONW_TYPE;
            }
            return shapeType.UNKONW_TYPE;
        }

}