package com.qnp.server.Utils.jwt;

import com.qnp.server.Models.UsersModel;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserService implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsersModel user = usersRepo.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException(username);
        }else{
            return new CustomUserDetails(user);
        }
    }
}
