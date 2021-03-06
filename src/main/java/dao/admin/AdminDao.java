package dao.admin;

import entity.Music;

public interface AdminDao {
    String login(String name,String password);

    Object showAllMusic();

    void deleteMusic(String id);

    void addMusic(Object object);

    Object showAllUser();

    Object searchUser(String input);

    Object selfInfo(String name);

    void addUser(Object object);

    void deleteUser(String id);

    void editMusicInfo(Object object);

    void editUserInfo(Object object);
}
