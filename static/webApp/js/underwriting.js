//提交搜索
$('.seach').on('click',function () {
    let id=$(this).prev().val();
    console.log(id);

    if(id!=''&& id!=null){
        window.location.href='/admin/underwriting/select?keyword='+id;
    }
});
//获取地址栏中是否有keyword
function keyword() {
    if(getParamFromUrl("keyword") !=null){
        $('.seach').prev().val(getParamFromUrl("keyword"));
        $('.box_tit_sea').text("待审核人员--搜索结果");
    }
}
keyword();
//封装方法  截取？后的值       根据参数部分和参数名来获取参数值
function getParamString(paraPart,name) {
    if(paraPart == null) return null;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = paraPart.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
function getParamFromUrl(name){
    var r = getParamString(window.location.search,name)
    return r
}
//预核保详情页面
var status;
//  是否通过信息
$('.result').on('click',function () {
    status=$(this).data('status');
    $('.underwritingStutas').val(status);
    showModal();
})
//确认反馈信息
$('.sub_yes').click(function () {
    console.log(status);
    $.ajax({
        url: "/admin/template/send",
        type : 'GET',
        data: {
            'underwritingId':$('.underwritingId').val(),
            'auditResult':status,
            'note':$('.back-info').val(),
        },
        dataType: "JSON",
        success: function (data) {
            closeModal();
            window.history.go(-1);
            location.reload();
        }
    })
});
$('.oper_close').click(function () {
    closeModal()
});
$('.sub_no').click(function () {
    closeModal();
});
//    关闭添加时模态框
function closeModal(){
    $('.add_modal').removeClass('tran_scale');
    $('.shadow').hide();
}
//    打开添加的模态框
function showModal(){
    $('.add_modal').addClass('tran_scale');
    $('.shadow').show();
}
$('.goAgent').click(function () {
    window.location.href='/admin/agent/select';
})
$('.changeAgent').click(function () {
   const COMPANY = $('.changAgentCompany').val();
   const EMPLOYEEID=$('.changeEmployeeId').val();
   const AGENTID=$('.changeAgentId').val();
   if(COMPANY==''){
       alert('公司不能为空！');
   }else if(EMPLOYEEID==''){
       alert('工号不能为空！');
   }else{
       $.ajax({
           url: "/admin/agent",
           type : 'PUT',
           data: {
               'agentId':AGENTID,
               'employeeId':EMPLOYEEID,
               'firm':COMPANY
           },
           dataType: "JSON",
           success: function (data) {
               alert('修改成功');
               window.location.href='/admin/agent/select';
           }
       })
   }
});