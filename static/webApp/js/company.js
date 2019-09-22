//  添加
$('.box_add').click(function(){
    showModal();
});
// 点击关闭
$('.oper_close').click(function(){
    closeModal();
});
$('.sub_no').click(function(){
    closeModal();
});
$('.shadow').click(function(){
    closeModal();
});
// 添加公司
$('.addcompany').click(function () {
    const company = $('.company').val();
    const firm = $('.firm').val();
    const jobNumber = $('.jobNumber').val();
    if(company == ' '){
        alert('请填写公司名称！');
    }else if(firm == ' '){
        alert('请填写公司简称！');
    }else if(jobNumber == ' '){
        alert('请填写工号前四位！');
    }else{
        $.ajax({
            url: "/admin/company",
            type : 'post',
            data: {
                'company':company,
                'firm':firm,
                'jobNumber':jobNumber
            },
            dataType: "JSON",
            success: function (data) {
                closeModal();
                alert('添加成功');
                window.location.href='/admin/company/select';
            }
        })
    }
});
// 删除公司
$('.deletecompany').click(function () {
    const thisId = $(this).next().text();
    console.log(thisId);
    $.ajax({
        url: "/admin/company?companyId="+thisId,
        type : 'DELETE',
        dataType: "JSON",
        contentType: "application/json",
        success: function (data) {
            alert(data.msg);
            window.location.href='/admin/company/select';
        }
    })
});
//修改公司信息
$('.changeSubmitCompany').click(function () {
    const companyId = $('.changecompanyId').val();
    const company = $('.changecompany').val();
    const firm = $('.changefirm').val();
    const jobNumber = $('.changejobNumber').val();
    $.ajax({
        url: "/admin/company",
        type : 'PUT',
        data: {
            'companyId':companyId,
            'company':company,
            'firm':firm,
            'jobNumber':jobNumber
        },
        dataType: "JSON",
        success: function (data) {
            alert(data.msg);
            window.location.href='/admin/company/select';
        }
    })
});
$('.changeCompant').click(function () {
   window.location.href='/admin/company/select';
});
//修改公告信息
$('.changeSubmitAnnouncement').click(function () {
    const announcementId = $('.changeannouncementId').val();
    const changetype = $('.changetype').val();
    const changedate = $('.changedate').val();
    $.ajax({
        url: "/admin/announcement",
        type : 'PUT',
        data: {
            'announcementId':announcementId,
            'type':changetype,
            'content':changedate
        },
        dataType: "JSON",
        success: function (data) {
            alert('修改成功');
            window.location.href='/admin/announcement/select';
        }
    })
});
$('.changeAnnoucement').click(function () {
    window.location.href='/admin/announcement/select';
});

//添加公告
$('.addAnnouncement').click(function () {
    const type = $('.announcementType').val();
    const content = $('.announcementContent').val();
    if(type == ''){
        alert('请填写公告类型！');
    }else if(content == ''){
        alert('请填写公告内容！');
    }else{
        $.ajax({
            url: "/admin/announcement",
            type : 'post',
            data: {
                'type':type,
                'content':content
            },
            dataType: "JSON",
            success: function (data) {
                closeModal();
                alert('添加成功');
                window.location.href='/admin/announcement/select';
            }
        })
    }
});
// 删除公告
$('.deleteAnnouncement').click(function () {
    const thisId = $(this).next().text();
    console.log(thisId);
    $.ajax({
        url: "/admin/announcement?announcementId="+thisId,
        type : 'DELETE',
        dataType: "JSON",
        contentType: "application/json",
        success: function (data) {
            alert(data.msg);
            window.location.href='/admin/announcement/select';
        }
    })
});