package dao.user.userImpl;

import dao.user.UserDao;
import entity.User;
import net.sf.json.JSONArray;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserDaoImpl implements UserDao {

    @Autowired
    private SessionFactory sessionFactory;

    private Transaction transaction;
    private Session session;
    private Query query;
    private List list;
    private JSONArray jsonArray;

//    用户登录
    public String login(String name, String password) {
        session = sessionFactory.openSession();
        query = session.createQuery("from User where name=?1 and password=?2");
        query.setParameter(1,name);
        query.setParameter(2,password);
        list = query.list();
        if (list.size() != 0){
            return "success";
        }else {
            return "error";
        }
    }

//    显示所有歌曲信息
    public Object showAllMusic() {
        session = sessionFactory.openSession();
        query = session.createQuery("from Music");
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        return jsonArray;
    }

//    普通用户查询歌曲
    public Object searchMusic(String input) {
        session = sessionFactory.openSession();
        query = session.createQuery("from Music where id = ?1 or name = ?2 or time = ?3 or singer = ?4 or url = ?5");
        try {
            query.setParameter(1, Integer.parseInt(input));
        }catch (NumberFormatException e){
            query.setParameter(1,0);
        }
        for (int i = 2;i < 6;i++){
            query.setParameter(i, input);
        }
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        return jsonArray;
    }

//    判断用户注册时用户名是否重复
    public String judgeSame(String input) {
        System.out.println(input);
        session = sessionFactory.openSession();
        query = session.createQuery("from User where name = ?1");
        query.setParameter(1,input);
        list = query.list();
        System.out.println(list.size());
        if (list.size() != 0){
            return "have";
        }else {
            return "noHave";
        }
    }

//    显示用户个人信息
    public Object selfInfo(String name) {
        session = sessionFactory.openSession();
        query = session.createQuery("from User where name = ?1");
        query.setParameter(1,name);
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        return jsonArray;
    }

//    用户注册(添加用户)
    public String register(User user) {
        session = sessionFactory.openSession();
        transaction = session.beginTransaction();
        session.save(user);
        try {
            transaction.commit();
            return "succ";
        }catch (Exception e){
            transaction.rollback();
            return "fail";
        }
    }
}
