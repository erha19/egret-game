class Gesture
{
    private _layer:egret.Shape;
    public addEvent(layer:egret.Shape)
    {
        this._layer = layer;

        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
    }
    public removeEvent()
    {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
    }

    private _mouseDatas:egret.Point[];
    private _currentPoint:egret.Point;
    private mouseDown(evt:egret.TouchEvent)
    {
        this._layer.graphics.clear();
        this._mouseDatas = [];
        let p:egret.Point = new egret.Point(evt.stageX,evt.stageY);
        this._mouseDatas.push(p);
        this._currentPoint = p;
    }
    private mouseMove(evt:egret.TouchEvent)
    {
        let p:egret.Point = new egret.Point(evt.stageX,evt.stageY);
        this._mouseDatas.push(p);

        this._layer.graphics.lineStyle(5,0) ;
        this._layer.graphics.moveTo(this._currentPoint.x,this._currentPoint.y);
        this._layer.graphics.lineTo(p.x,p.y);
        this._layer.graphics.endFill();
        this._currentPoint = p;
    }
    private mouseUp(evt:egret.TouchEvent)
    {
        let p:egret.Point = new egret.Point(evt.stageX,evt.stageY);
        this._mouseDatas.push(p);
        this._layer.graphics.clear();

        this.motion();
    }

    private motion()
    {
        let _arr:egret.Point[] = [];
        let currentIndex:number = 0;
        let len:number = this._mouseDatas.length;
        _arr.push(this._mouseDatas[currentIndex]);
        for(let i:number=0; i<len; i++)
        {
            if( egret.Point.distance(this._mouseDatas[currentIndex], this._mouseDatas[i])>30 )
            {
                currentIndex = i;
                _arr.push(this._mouseDatas[currentIndex]);
            }
        }

        this._mouseDatas = _arr;

        this.parseDirection();
    }

    private _dirsArr:number[];
    private parseDirection()
    {

        this._dirsArr = [];
        let len:number = this._mouseDatas.length;
        for(let i:number=0; i<len; i++)
        {
            if( this._mouseDatas[i+1])
            {
                let p1:egret.Point = this._mouseDatas[i];
                let p2:egret.Point = this._mouseDatas[i+1];
                let a:number = p1.y - p2.y;
                let b:number = egret.Point.distance(p1,p2);
                let rad:number = Math.asin( a/b );
                let ang:number = rad * 57.2957800; // rad * 180/Math.PI 直接求常量，优化
                let quad:number = this.quadrant(p1,p2);
                let dir:number = this.getDirByAngQuad(ang, quad);
                this._dirsArr.push(dir);
                //console.log("quad: ",quad, "ang: ", ang);
            }
        }
        //console.log(this._dirsArr);
        let dirstr:string = this.repDiff( this._dirsArr );
        console.log( dirstr );
        let rel:number = this.sweep( dirstr );
        console.log("type: ",rel);
        this.disEvent(rel);
    }

    private disEvent(type:number)
    {
        Data.type = type;
        if(type != -1)
        {
            egret.MainContext.instance.stage.dispatchEvent(new egret.Event("action"));
        }
    }

    private _symbol:string[] = ["28","46","82","64","141","585","3","7","5","1","4321876","2345678"];
    private _symbolG:number[] = [0,0,3,3,5,5,1,1,2,2,4,4];

    // v 0
    // | 1
    // - 2
    // ^ 3
    // 6 4
    // z 5

    private sweep( str:string ):number
    {
        let maxType:number = -1;
        let max:number = -1;
        let len:number = this._symbol.length;
        for(let i:number=0; i<len; i++)
        {
            let val:number = this.Levenshtein_Distance_Percent(this._symbol[i], str);
            egret.log(val,max);
            if(val>max)
            {
                max = val;
                maxType = this._symbolG[i];
            }
        }

        if(max<0.4)
        {
            maxType = -1;
        }
        return maxType;
    }

    /*
    对比去重
     */
    private repDiff(data:number[]):string
    {
        let str:string = "";
        let len:number = data.length;
        let currentType:number = 0;
        for(let i:number=0; i<len; i++)
        {
            if( currentType != data[i])
            {
                currentType = data[i];
                str += data[i];
            }
        }
        return str;
    }
    /*
    根据所在象限与角度计算出方向编号。
    方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为8份。
     */
    private getDirByAngQuad(ang:number,quad:number):number
    {
        switch(quad)
        {
            case 1:
                if( ang<=22.5 && ang>= 0 )
                {
                    return 1;
                }
                else if( ang<= 67.5 && ang> 22.5 )
                {
                    return 8;
                }
                else
                {
                    return 7;
                }
            case 2:
                if( ang<=22.5 && ang>=0 )
                {
                    return 5;
                }
                else if( ang<= 67.5 && ang> 22.5 )
                {
                    return 6;
                }
                else
                {
                    return 7;
                }
            case 3:
                if( ang<= -67.5 && ang>= -90 )
                {
                    return 3;
                }
                else if( ang<=-22.5 && ang> -67.5 )
                {
                    return 4;
                }
                else{
                    return 5;
                }
            case 4:
                if( ang<=-67.5 && ang>= -90 )
                {
                    return 3;
                }
                else if( ang<=-22.5 && ang>-67.5)
                {
                    return 2;
                }
                else{
                    return 1;
                }
        }
    }

    /*
    计算两点关系所形成的象限
    以P1 作为坐标原点，P2为设定点，判断P2相对于P1时所在象限
     */
    private quadrant(p1:egret.Point,p2:egret.Point):number
    {
        if(p2.x>=p1.x)
        {
            if( p2.y <= p1.y )
            {
                return 1;
            }
            else
            {
                return 4;
            }
        }
        else
        {
            if( p2.y <= p1.y )
            {
                return 2;
            }
            else
            {
                return 3;
            }
        }
    }

    private Levenshtein_Distance(s,t)
    {
        let n=s.length;// length of s
        let m=t.length;// length of t
        let d=[];// matrix
        let i;// iterates through s
        let j;// iterates through t
        let s_i;// ith character of s
        let t_j;// jth character of t
        let cost;// cost

        // Step 1
        if (n == 0) return m;
        if (m == 0) return n;

        // Step 2
        for (i = 0; i <= n; i++) {
            d[i]=[];
            d[i][0] = i;
        }

        for (j = 0; j <= m; j++) {
            d[0][j] = j;
        }

        // Step 3

        for (i = 1; i <= n; i++) {
            s_i = s.charAt (i - 1);
            // Step 4
            for (j = 1; j <= m; j++) {
                t_j = t.charAt (j - 1);
                // Step 5
                if (s_i == t_j) {
                    cost = 0;
                }else{
                    cost = 1;
                }

                // Step 6
                d[i][j] = this.Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
            }
        }

        // Step 7
        return d[n][m];
    }

    private Levenshtein_Distance_Percent(s,t):number{

        let l=s.length>t.length?s.length:t.length;
        let d=this.Levenshtein_Distance(s,t);
        return (1-d/l);//.toFixed(4);

    }

    private Minimum(a,b,c){
        return a<b?(a<c?a:c):(b<c?b:c);
    }
}