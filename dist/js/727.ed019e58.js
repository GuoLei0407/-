"use strict";(self["webpackChunktoutiao_mobile"]=self["webpackChunktoutiao_mobile"]||[]).push([[727],{5727:function(t,a,s){s.r(a),s.d(a,{default:function(){return c}});var n=function(){var t=this,a=t._self._c;return a("div",[a("van-nav-bar",{attrs:{title:"搜索结果","left-arrow":""},on:{"click-left":function(a){return t.$router.go(-1)}}}),a("van-list",{attrs:{finished:t.finished},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},t._l(t.list,(function(s){return a("van-cell",{key:s.art_id,on:{click:function(a){return t.$router.push("/article?id="+s.art_id)}}},[[a("div",{staticClass:"title"},[t._v(t._s(s.title))]),a("van-grid",{attrs:{border:!1,"column-num":s.cover.type}},t._l(s.cover.images,(function(t,s){return a("van-grid-item",{key:s},[a("van-image",{staticClass:"pic",attrs:{src:t}})],1)})),1),a("div",{staticClass:"other"},[a("span",[t._v(t._s(s.aut_name))]),a("span",{staticClass:"comment"},[t._v(" "+t._s(s.comm_count)+" ")]),a("span",[t._v(t._s(s.pubdate))])])]],2)})),1),t.noResults?a("van-cell",[a("div",{staticClass:"nores"},[t._v("抱歉暂时还没有您要搜索的内容")])]):t._e()],1)},i=[],e=s(5198),l={data(){return{loading:!1,list:[],page:1,finished:!1,noResults:!1}},methods:{async onLoad(){const t=await(0,e.rq)({page:this.page,q:this.$route.params.key});console.log(t),t.data.data.results.length?(this.page++,this.list.push(...t.data.data.results),this.loading=!1):this.noResults=!0,this.list.length>=t.data.data.total_count&&(this.finished=!0)}}},o=l,r=s(1001),u=(0,r.Z)(o,n,i,!1,null,"54fa188f",null),c=u.exports}}]);