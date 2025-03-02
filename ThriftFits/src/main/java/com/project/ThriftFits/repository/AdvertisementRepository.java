package com.project.ThriftFits.repository;

import com.project.ThriftFits.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
    List<Advertisement> findTop8ByOrderByCreatedAtDesc();

    @Query("SELECT a FROM Advertisement a " +
            "WHERE (:clothingName IS NULL OR lower(a.clothingName) LIKE lower(concat('%', cast(:clothingName as string), '%'))) " +
            "AND (:clothingBrand IS NULL OR lower(a.clothingBrand) LIKE lower(concat('%', cast(:clothingBrand as string), '%'))) " +
            "AND (:clothingType IS NULL OR lower(a.clothingType) LIKE lower(concat('%', cast(:clothingType as string), '%'))) " +
            "AND (:clothingSize IS NULL OR lower(a.clothingSize) LIKE lower(concat('%', cast(:clothingSize as string), '%'))) " +
            "AND (:clothingColor IS NULL OR lower(a.clothingColor) LIKE lower(concat('%', cast(:clothingColor as string), '%')))")
    List<Advertisement> findByClothingAttributes(String clothingName, String clothingBrand, String clothingType, String clothingSize, String clothingColor);

    List<Advertisement> findAllByOrderByCreatedAtDesc();

    List<Advertisement> findAllByOrderByCreatedAtAsc();

    List<Advertisement> findByClothingNameContainingIgnoreCase(String searchText);
}
