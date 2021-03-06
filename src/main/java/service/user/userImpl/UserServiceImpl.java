package service.user.userImpl;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import dao.user.userImpl.UserDaoImpl;
import entity.User;
import net.sf.json.JSONArray;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.user.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class UserServiceImpl extends ActionSupport implements UserService, ModelDriven<Object> {
    @Autowired
    private UserDaoImpl userDao;

    private HttpServletRequest request;
    private HttpServletResponse response;
    private User user = new User();

//    用户登录
    public String login() {
        request = ServletActionContext.getRequest();
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String result = userDao.login(name, password);
        if (result == "success"){
            request.getSession().setAttribute("customer",name);
        }
        return result;
    }

//    显示所有用户信息
    public void showAllMusic() {
        JSONArray jsonArray = (JSONArray) userDao.showAllMusic();
        response = ServletActionContext.getResponse();
//        解决传递到Ajax的数据乱码
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    查询音乐信息
    public void searchMusic() {
        request = ServletActionContext.getRequest();
        response = ServletActionContext.getResponse();
        response.setContentType("text/html;charset=utf-8");
        String info = request.getParameter("info");
        JSONArray jsonArray = (JSONArray) userDao.searchMusic(info);
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    判断用户名是否存在
    public void judgeSame() {
        request = ServletActionContext.getRequest();
        response = ServletActionContext.getResponse();
        String input = request.getParameter("input");
        String s = userDao.judgeSame(input);
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    个人信息
    public void selfInfo() {
        request = ServletActionContext.getRequest();
        String name = (String) request.getSession().getAttribute("customer");
        JSONArray jsonArray = (JSONArray) userDao.selfInfo(name);
        response = ServletActionContext.getResponse();
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().println(jsonArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    struts自动赋值给实体类
    public Object getModel() {
        return user;
    }

//    用户注册
    public void register() {
        response = ServletActionContext.getResponse();
        user = (User) getModel();
        String register = userDao.register(user);
        try {
            response.getWriter().println(register);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
