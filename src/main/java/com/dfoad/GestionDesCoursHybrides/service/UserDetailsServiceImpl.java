package com.dfoad.GestionDesCoursHybrides.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dfoad.GestionDesCoursHybrides.modele.ResponsableDfoad;
import com.dfoad.GestionDesCoursHybrides.repository.ResponsableDfoadRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService  {
	@Autowired
	private ResponsableDfoadRepository repository;

	@Override
	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		Optional<ResponsableDfoad> user = repository.findByPseudo(mail); 

		UserBuilder builder = null;
		if (user.isPresent()) {
			ResponsableDfoad currentUser = user.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(mail);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		} else {
			throw new UsernameNotFoundException("User not found.");
		}

		return builder.build();	    
	}
}
