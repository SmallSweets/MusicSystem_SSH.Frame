package service.admin.adminImp;

import com.opensymphony.xwork2.ActionSupport;
import dao.admin.adminImpl.AdminDaoImpl;
import entity.Music;
import entity.User;
import net.sf.json.JSONArray;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.admin.AdminService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class AdminServiceImpl extends ActionSupport implements AdminService {
    @Autowired
    private AdminDaoImpl adminDao;

    private HttpServletRequest request;
    private HttpServletResponse response;
    private Music music = new Music();
    private User user = new User();

//    管理员登录
    public String login() {
        request = ServletActionContext.getRequest();
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String result = adminDao.login(name, password);
        if (result == "success"){
            request.getSession().setAttribute("admin",name);
        }
        return result;
    }

//    显示所有音乐信息
    public void showAllMusic() {
        response = ServletActionContext.getResponse();
        JSONArray jsonArray = (JSONArray) adminDao.showAllMusic();
//        解决传递到Ajax的数据乱码
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    删除音乐信息
    public void deleteMusic() {
        request = ServletActionContext.getRequest();
        String id = request.getParameter("id");
        adminDao.deleteMusic(id);
    }

//    添加音乐信息
    public void addMusic() {
        music = getMusic();
        adminDao.addMusic(music);
    }

//    实现getModel方法 获取表单数据并自动赋值给实体类 但只能封装一个实体类
//    public Music getModel() {
//        return music;
//    }

    //    获取表单数据并自动赋值给实体类 可以封装多个实体类
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Music getMusic() {
        return music;
    }

    public void setMusic(Music music) {
        this.music = music;
    }


//    显示所有用户信息
    public void showAllUser() {
        response = ServletActionContext.getResponse();
        JSONArray jsonArray = (JSONArray) adminDao.showAllUser();
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    查询用户信息
    public void searchUser() {
        request = ServletActionContext.getRequest();
        response = ServletActionContext.getResponse();
        response.setContentType("text/html;charset=utf-8");
        String input = request.getParameter("input");
        JSONArray jsonArray = (JSONArray) adminDao.searchUser(input);
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    个人信息
    public void selfInfo() {
        request = ServletActionContext.getRequest();
        String name = (String) request.getSession().getAttribute("admin");
        JSONArray jsonArray = (JSONArray) adminDao.selfInfo(name);
        response = ServletActionContext.getResponse();
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    添加用户
    public void addUser(){
        user = getUser();
        adminDao.addUser(user);
    }

//    删除用户
    public void deleteUser() {
        request = ServletActionContext.getRequest();
        String id = request.getParameter("id");
        adminDao.deleteUser(id);
    }

}
