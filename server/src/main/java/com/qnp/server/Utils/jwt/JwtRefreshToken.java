package com.qnp.server.Utils.jwt;

import com.fasterxml.uuid.Generators;

public class JwtRefreshToken {

    public JwtRefreshToken(){

    }

    public String generate(){
        return Generators.randomBasedGenerator().generate().toString();
    }
}
