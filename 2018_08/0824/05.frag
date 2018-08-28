precision highp float;
uniform vec2 resolution;
uniform float time;

float pct(float i,vec2 st)
{
    return (smoothstep(st.x-0.01,st.x,(st.y-i)*sin((time-0.01)))-smoothstep(st.x,st.x+0.01,(st.y-i)*sin((time+0.15))));
}

float pct1(float i,vec2 st)
{
    return (smoothstep(st.x-0.01,st.x,(st.y-i)*sin((time-0.15)))-smoothstep(st.x,st.x+0.01,(st.y-i)*sin((time+0.01))));
}


void main()
{
    vec3 color=vec3(0.0);
    vec2 st=(gl_FragCoord.xy*2.0-resolution)/resolution;
    st.y+=1.0;


    for(float i=0.0;i<1.0;i+=0.1)
    {
      color+=vec3(pct(i,st));
	    color*=vec3(0.7,0.4,0.3);

	    vec3 hoge=vec3(pct1(i,st-vec2(0.01)));
      hoge*=vec3(0.1,0.6,0.7);

	    color+=hoge;
    }




    gl_FragColor=vec4(vec3(color),1.0);

}
