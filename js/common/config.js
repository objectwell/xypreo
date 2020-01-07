var ajaxRoot = "http://192.168.1.102:8080/";    
// var ajaxRoot = "http://122.207.81.240:1602/"; 
var ajaxRoot = " http://yldhez.natapp1.cc/";  

var AJAX_API = {
    //通用
    common:{
        gethospitals:"web/organization/hospitals",    // 获取医院
        getdepartments:"web/organization/departments?id=",  //获取科室
        getconsultationtype:"web/consultation-type/read-all",  //会诊类型列表
        getspecialist:"web/specialist/list",              // 专家列表
    },
    // 用户中心
    user:{
        webLogin:"oauth/token",                      // 登陆
        register:"web/user/register",                // 注册
        userInfo:"android/user/user-info",            // 用户信息
        license:"android/user/upload-license",         // 上传营业执照 
        resetPwd:"web/user/reset-pwd",       //修改密码
    },
    // 管理系统
    admin:{  
        // 内容管理                          
        article:{
            create:"web/article/create",             // 新增
            list:"web/article/list-all",             // 列表 全部
            detail:"web/article/detail?articleId=",  //内容详情
            delete:"web/article/delete",             //内容删除
            audit:"web/article/audit",               // 内容审核
        },
        // 组织机构
        organization:{
            list:"web/organization/list",          // 列表
            delete:"web/organization/delete",      // 删除 
            deleteBatch:"web/organization/delete-batch",  // 批量删除
            create:"web/organization/create",      //新增
            update:"web/organization/update",      //修改
        },
        // 权限
        permission: {
            list:"web/permission/list",        // 列表
            create:"web/permission/create",    // 创建
            update:"web/permission/update",     // 修改
            delete:"web/permission/delete",      // 删除
            deleteBatch:"web/permission/delete-batch",  // 批量删除
        },
        // 角色
        role: {
            list:"web/role/list",        // 列表
            create:"web/role/create",    // 创建
            update:"web/role/update",     // 修改
            delete:"web/role/delete",      // 删除
            deleteBatch:"web/role/delete-batch",  // 批量删除
            allot:"web/role/allot"           // 权限分配
        },
        // 用户啊
        user:{
            list:"web/user/list",        // 列表
            create:"web/user/create",    // 创建
            update:"web/user/update",     // 修改
            delete:"web/user/delete"      // 删除
        }
    },
    upImg : {
        updata:"web/bingli/upload-img",  // 图片上传
        delete:"web/bingli/delete-img" ,  // 图片删除
        license:"android/user/upload-license", // 上传执照
        avater:"android/user/upload-avater"   // 上传头像
    },
    // 会诊
    consultation: {
        listStart:"web/bingli/info-start",    // 我发起的
        listJoin:"web/bingli/info-join",    // 我参与的
        detail:"android/bingli/detail?bingLiId=",  // 会诊详情
        require:"android/consultation-require/find",  // 会诊需求
        type:"android/consultation-type/read-all",  // 会诊类型
        specialistTree:"web/specialist/tree",              //   tree  选择专家
        applyConsultation:"android/bingli/start",          //  申请会诊转诊
        reply:"android/bingli/reply",           // 审核   状态变更为未审核
        complete:"android/bingli/complete",           // 审核   状态变更为已完成
        create:"android/bingli-opinion/create",       // 会诊意见提交
    },
     // 2d伤口测量
     measure: {
        create:"android/bingli/create",    // 创建
        list:"android/measure-2d/list",        // 列表
        dinfo:"android/bingli/find-one?bingLiId=",     // 会诊详情信息
        images:"android/bingli/detec-image",            // 获取会诊图片
        query:"android/bingli/query?bingLiId=",          //查询患者资料、伤口资料
        situations:"android/bingli/query-situations",    //查询全身情况补充字典
        detect:"android/bingli/detect?bingLiId=",         // 分析结果
        brokenline:"android/bingli/brokenline?bingLiId=",  // 折线图
        saveMeasure:"android/bingli/update",                    // 保存测量意见   
        saveAnalysis:"android/measure-2d/create",          //保存分析结果
        
        
    },
    // 我的患者
    patient: {
        patient:"web/bingli/my-patient",                            //列表
        updata:"web/bingli/create-or-update",                       // 新建/修改
    },
    // im
    im: {
        server:"http://xyim.com:5280",                              // 服务器地址
        domaian:"@xyim.com",                                  // 后缀
        allList:"",                            //全部列表
        frend:"",                              // 好友列表
        roomid:"web/bingli/roomid",            // 群列表
    }
}