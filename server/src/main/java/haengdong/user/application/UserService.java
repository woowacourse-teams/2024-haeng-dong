package haengdong.user.application;

import haengdong.common.exception.AuthenticationException;
import haengdong.common.exception.HaengdongErrorCode;
import haengdong.common.exception.HaengdongException;
import haengdong.event.application.response.UserAppResponse;
import haengdong.user.application.request.UserGuestSaveAppRequest;
import haengdong.user.application.request.UserJoinAppRequest;
import haengdong.user.application.request.UserUpdateAppRequest;
import haengdong.user.domain.User;
import haengdong.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public Long joinGuest(UserGuestSaveAppRequest request) {
        User user = request.toUser();

        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Transactional
    public Long join(UserJoinAppRequest request) {
        User user = userRepository.findByMemberNumber(request.memberNumber())
                .orElseGet(() -> userRepository.save(request.toUser()));

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

    @Transactional
    public void withdraw(Long id) {
        userRepository.deleteById(id);
        eventPublisher.publishEvent(new UserDeleteEvent(id));
    }

    @Transactional(readOnly = true)
    public UserAppResponse findById(Long id) {
        User user = getUser(id);

        return UserAppResponse.of(user);
    }

    @Transactional(readOnly = true)
    public String findMemberNumberById(Long id) {
        return getUser(id).getMemberNumber();
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new HaengdongException(HaengdongErrorCode.PASSWORD_INVALID));
    }
}
