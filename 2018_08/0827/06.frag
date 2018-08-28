precision highp float;
uniform  vec2 resolution;
uniform float time;

vec3 circle(float r , vec2 uv,float x , float y)
{
    vec3 c=vec3(.0);
    vec3 cir_color=vec3(.0);
    if(uv.x<x && uv.y<y)
    {
        cir_color=vec3(0.9*time,0.8,0.2);
        c  = cir_color*vec3(smoothstep(r,r, dot(uv,uv))-smoothstep(r+0.05*fract(time),r+0.1*sin(time), dot(uv+0.05,uv+0.05)));
        return c;
    }
    else if(uv.x>x && uv.y>y)
    {
        cir_color=vec3(0.1,0.7,0.8*time);
        c  = cir_color*vec3(smoothstep(r,r, dot(uv,uv))-smoothstep(r+0.05*fract(time),r+0.1*cos(time), dot(uv-0.05,uv-0.05)));
        return c;
    }
    else if(uv.x>x && uv.y<y)
    {
        cir_color=vec3(0.9*time,0.4,0.6);
        c  = cir_color*vec3(smoothstep(r,r, dot(uv,uv))-smoothstep(r+0.05,r+0.1, dot(uv+0.05,uv+0.05)));
        return c;
    }
    else if(uv.x<x && uv.y>y)
    {
        cir_color=vec3(0.6,0.8*time,0.4);
        c  = cir_color*vec3(smoothstep(r,r, dot(uv,uv))-smoothstep(r+0.05,r+0.1, dot(uv-0.05,uv-0.05)));
        return c;
    }
    else
    {
      return vec3(1.0);
    }

}

vec3 line(vec2 uv,vec3 line_color)
{
      return
      line_color*(vec3(smoothstep(uv.y*fract(time), uv.y*fract(time),.8)-smoothstep(-uv.y*fract(time), -uv.y*fract(time),-.8)));

}

void main()
 {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        vec3 color=vec3(.0);

        vec3 cir=circle(0.2,uv*fract(time),0.3*sin(time),0.1*sin(time));
        vec3 cir1=circle(0.5,uv/sin(time),-0.9*sin(time),0.1*sin(time));
        vec3 cir2=circle(fract(time),uv*sin(time),0.2,0.3);
        vec3 cir3=circle(sin(time),uv,-0.3,-0.7);



        vec3 a=line(uv+0.4,vec3(0.9,0.4,0.5));
        vec3 b=line(uv-0.6,vec3(0.1,0.7,0.9));
        vec3 c=line(uv-0.3,vec3(0.8,0.8,0.3));
        vec3 d=line(uv+0.2,vec3(0.4,0.3,0.2));
        vec3 line_color=a+b+c+d;

        color=cir+cir1+cir2+cir3;
        color +=line_color;


        gl_FragColor = vec4(vec3(color),1.0);
}
