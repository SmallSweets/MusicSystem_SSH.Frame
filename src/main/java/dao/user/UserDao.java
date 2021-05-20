package dao.user;

import entity.User;

public interface UserDao {
    String login(String name,String password);

    Object showAllMusic();

    Object searchMusic(String info);

    String judgeSame(String input);

    Object selfInfo(String name);

    String register(User user);
}
