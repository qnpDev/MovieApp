package com.qnp.server.Controllers;

import com.qnp.server.Models.*;
import com.qnp.server.Repositories.BillingRepo;
import com.qnp.server.Repositories.UsersRepo;
import com.qnp.server.Utils.Payloads.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/billing")
public class BillingApi {
//    @Autowired
//    private BillingRepo billingRepo;
//
//    @Autowired
//    private UsersRepo usersRepo;
//
//    @GetMapping
//    public ResponseEntity<?> get(){
//        return ResponseEntity.ok(billingRepo.findAll());
//    }
//
//    @GetMapping()
//    public ResponseEntity<?> getByUser(){
//        UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
//        List<BillingModel> data = billingRepo.findByUsers(user);
//        return ResponseEntity.ok(data);
//    }
//
//    @GetMapping("{id}")
//    public ResponseEntity<?> getById(@PathVariable Long id){
//        Optional<BillingModel> data = billingRepo.findById(id);
//        if(data.isPresent()){
//            UsersModel user = usersRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
//            BillingModel trans = data.get();
//            if(trans.getUsers().getId() == user.getId()){
//                return ResponseEntity.ok(data.get());
//            }else{
//                ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body(new GeneralResponse(false, "Not match user get", null));
//            }
//        }
//        return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(new GeneralResponse(false, "Not found", null));
//    }

//    @PostMapping
//    public ResponseEntity<?> create(@Valid @RequestBody MoviesAdminRequest request){
//        try{
//            MoviesModel data = new MoviesModel();
//            data.setTitle(request.getTitle());
//            data.setDescription(request.getDescription());
//            data.setImgTitle(request.getImgTitle());
//            data.setImgSm(request.getImgSm());
//            data.setTrailer(request.getTrailer());
//            data.setVideo(request.getVideo());
//            data.setYear(request.getYear());
//            data.setLimitAge(request.getLimitAge());
//            data.setActive(request.isActive());
//            data.setVip(request.isVip());
//            data.setSeries(seriesRepo.findById(request.getSeries()).get());
//            List<CategoriesModel> categories = (List<CategoriesModel>) categoriesRepo.findAllById(request.getCategories());
//            data.getCategories().addAll(categories);
//            MoviesModel dataSave = moviesRepo.save(data);
//            return ResponseEntity.ok(dataSave);
//        }catch (Exception e){
//            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(new GeneralResponse(false, e.getMessage(), null));
//        }
//    }

}
