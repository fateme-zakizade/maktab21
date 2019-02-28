let pages=5;

function setpages()
{
  if(pages>2)
{
  $( ".pagination" ).append( `<li class="page-item ">
  <a href="javascript:void(0);"  class="page-link"><span>قبلی</span></a>
</li>
<li class="page-item active">
  <a href="javascript:void(0);" class="page-link"><span>1</span><div class="ripple-container"></div></a>
</li>
<li class="page-item">
<a href="javascript:void(0);" class="page-link"><span>2</span><div class="ripple-container"></div></a>
</li>
<li class="page-item">
<a href="javascript:void(0);" class="page-link"><span>3</span><div class="ripple-container"></div></a>
</li>
<li class="page-item ">
  <a href="javascript:void(0);" id="next" class="page-link"><span>بعدی</span><div class="ripple-container"></div></a>
</li>`);
}
else if(pages==2)
{
  $( ".pagination" ).append( `<li class="page-item ">
  <a href="javascript:void(0);"  class="page-link"><span>قبلی</span></a>
</li>
<li class="page-item active">
  <a href="javascript:void(0);" class="page-link"><span>1</span><div class="ripple-container"></div></a>
</li>
<li class="page-item">
<a href="javascript:void(0);" class="page-link"><span>2</span><div class="ripple-container"></div></a>
</li>
<li class="page-item ">
  <a href="javascript:void(0);" id="next" class="page-link"><span>بعدی</span><div class="ripple-container"></div></a>
</li>`);
}
}
$(".pagination>liy").click(function()
{
  let select=($(this).find("a>span").text());
  
//*************************************************************************


// $.ajax({
//           url: "/page",
//           data: {
//             select:select
//           },
//           success: function (result) {
//             result=Object.keys(result).map(data=>data);
//             showArticle(result);
//           }
//         });

$( ".article" ).append( showArticle([]) );







//***********************************************************************8
  setTimeout(function()
  {
  if(select==="قبلی")
  {
    let show=Number( $(".pagination").find(".active").find("a>span").text());
    if(show-1>0)
    select=show-1;
    else
    select=show;

  }
  else if(select==="بعدی"){
    let show= Number( $(".pagination").find(".active").find("a>span").text());
    if(show+1<=pages)
    select=show+1;
    else
    select=show;
    console.log(select)

  }
  else  select=Number(select);
    $(".pagination>li").removeClass("active");
    
    if(select==1)
  {
    if(pages>2)
    {
      $(".pagination").find("li:eq(1)").find("a>span").html(1);
      $(".pagination").find("li:eq(2)").find("a>span").html(2);
      $(".pagination").find("li:eq(3)").find("a>span").html(3);
     
    }
    else{
      $(".pagination").find("li:eq(1)").find("a>span").html(1);
      $(".pagination").find("li:eq(2)").find("a>span").html(2);
      
    }
    $(".pagination").find("li:eq(1)").addClass("active");
   
  }
  else  if(select<pages)
  {
      $(".pagination").find("li:eq(1)").find("a>span").html(select-1);
      $(".pagination").find("li:eq(2)").find("a>span").html(select);
      $(".pagination").find("li:eq(3)").find("a>span").html(select+1);
  
    $(".pagination").find("li:eq(2)").addClass("active");
   
  }
  else
  {
    if(pages>2)
    {
      $(".pagination").find("li:eq(1)").find("a>span").html(select-2);
    $(".pagination").find("li:eq(2)").find("a>span").html(select-1);
    $(".pagination").find("li:eq(3)").find("a>span").html(select);
    $(".pagination").find("li:eq(3)").addClass("active");
    }
    else
    {
      $(".pagination").find("li:eq(1)").find("a>span").html(select-1);
    $(".pagination").find("li:eq(2)").find("a>span").html(select);
    $(".pagination").find("li:eq(2)").addClass("active");
    }
    
    
  }

  },400)
  
 
})

function showArticle(data)
{
let result="";
let number=0;
Object.keys(data).forEach(key => {

  result+=`<div class="card d-flex ${(number%2==0) ? "flex-md-row" : "flex-md-row-reverse" } card-height" style="margin-bottom: 80px">
          '<div class="card-header p-0 " >
<img src="${data[key].image}" class="img-fluid">
</div>
<div class="d-flex flex-column card-body h-100 col-md-8">
<h4 class="mr-0 ml-auto card-title my-3" style="font-size: 18px;white-space: wrap" >${data[key].tilte}</h4>
<p class="mr-0 ml-auto" style=" text-align: justify;text-justify: inter-word;white-space: wrap;overflow: hidden;line-height: 20px" >${data.text}</p>
<div class="d-flex flex-row mb-0 mt-auto h-100" style="align-items: flex-end;"> <p style="font-size:12px!important">تاریخ انتشار:${data.date}</p>
<p  class="mx-2" style="font-size:12px!important">نوشته شده توسط:</p><form action="" class=" float-left mr-auto">
                        <button class="btn btn-rose px-2 py-1" type="submit"  rel="tooltip"  data-placement="top"  data-original-title="کامل بخوانید" style="font-size:12px!important">بیشتر</button>
                    </form>
                   
                  </div>

            </div>
           
        </div>`
++number;
       
});

        return result;
}