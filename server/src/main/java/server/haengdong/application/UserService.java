package server.haengdong.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.UserGuestSaveAppRequest;
import server.haengdong.application.request.UserUpdateAppRequest;
import server.haengdong.domain.user.User;
import server.haengdong.domain.user.UserRepository;
import server.haengdong.exception.AuthenticationException;
import server.haengdong.exception.HaengdongErrorCode;
import server.haengdong.exception.HaengdongException;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final EventMemberService eventMemberService;
    private final KakaoClient kakaoClient;

    @Transactional
    public Long joinGuest(UserGuestSaveAppRequest request) {
        User user = request.toUser();

        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Transactional
    public Long join(String memberNumber, String nickname) {
        User user = userRepository.findByMemberNumber(memberNumber)
                .orElseGet(() -> userRepository.save(User.createMember(nickname, memberNumber)));

        return user.getId();
    }

    @Transactional(readOnly = true)
    public void validateUser(Long id, String password) {
        User user = getUser(id);

        if (user.isPasswordMismatch(password)) {
            throw new AuthenticationException(HaengdongErrorCode.PASSWORD_INVALID);
        }
    }

    @Transactional
    public void updateUser(UserUpdateAppRequest request) {
        User user = getUser(request.id());

        if (request.isNicknameExist()) {
            user.changeNickname(request.nickname());
        }
        if (request.isAccountExist()) {
            user.changeAccount(request.bankName(), request.accountNumber());
        }
    }

    @Transactional(readOnly = true)
    public String findNicknameById(Long id) {
        User user = getUser(id);
        return user.getNickname();
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.PASSWORD_INVALID));
    }
}
