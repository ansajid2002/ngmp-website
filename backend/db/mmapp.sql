PGDMP  3                    {            mmapp    16.0    16.0    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    16720    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    16721 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            C           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2                       1255    17696    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    next_id INT;
BEGIN
    SELECT nextval('transactions_id_seqs') INTO next_id;
    RETURN next_id; 
END;
$$;
 ,   DROP FUNCTION public.next_transaction_id();
       public          postgres    false            �            1259    16731 
   attributes    TABLE     �   CREATE TABLE public.attributes (
    attribute_id integer NOT NULL,
    attribute_name character varying(255) NOT NULL,
    attribute_values text[],
    category text,
    subcategory text
);
    DROP TABLE public.attributes;
       public         heap    postgres    false            �            1259    16736    attributes_attribute_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attributes_attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.attributes_attribute_id_seq;
       public          postgres    false    216            D           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
          public          postgres    false    217            �            1259    16737    audioheadphones    TABLE     	  CREATE TABLE public.audioheadphones (
    product_ah_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    subcategory text,
    condition text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    driversize character varying(255),
    impedance character varying(255),
    frequencyrange character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 #   DROP TABLE public.audioheadphones;
       public         heap    postgres    false            �            1259    16747 "   audio_headphones_product_ah_id_seq    SEQUENCE     �   CREATE SEQUENCE public.audio_headphones_product_ah_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.audio_headphones_product_ah_id_seq;
       public          postgres    false    218            E           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
          public          postgres    false    219            �            1259    16748    cameraphotography    TABLE     ;  CREATE TABLE public.cameraphotography (
    product_cp_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subcategory character varying(255),
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    condition text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    modelname character varying(255),
    storagetype character varying(255),
    storagecapacity character varying(255),
    displaysize character varying(255),
    screenresolution character varying(255),
    connectivityports character varying(255),
    batterylife character varying(255),
    dimensions character varying(255),
    weight numeric(10,2),
    warrantyinformation character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 %   DROP TABLE public.cameraphotography;
       public         heap    postgres    false            �            1259    16758 $   camera_photography_product_cp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.camera_photography_product_cp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.camera_photography_product_cp_id_seq;
       public          postgres    false    220            F           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.camera_photography_product_cp_id_seq OWNED BY public.cameraphotography.product_cp_id;
          public          postgres    false    221            �            1259    16759    cart    TABLE     �  CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    customer_id integer,
    vendor_id integer,
    product_uniqueid character varying(255) NOT NULL,
    category character varying(255),
    subcategory character varying(255),
    quantity integer NOT NULL,
    addeddate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updateddate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    variantlabel text,
    mrp text,
    sellingprice text
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16766    cart_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_cart_id_seq;
       public          postgres    false    222            G           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;
          public          postgres    false    223            �            1259    16767 
   categories    TABLE     �  CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(255) NOT NULL,
    category_description text,
    category_image_url character varying(255),
    category_status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    category_type character varying(255)
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16775    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    224            H           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    225            �            1259    16776    clothing    TABLE     �  CREATE TABLE public.clothing (
    product_fac_id integer NOT NULL,
    ad_title character varying(255) NOT NULL,
    additionaldescription text,
    countryoforigin character varying(255) NOT NULL,
    manufacturername character varying(255) NOT NULL,
    packerdetails character varying(255) NOT NULL,
    searchkeywords text,
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255) NOT NULL,
    city character varying(255),
    state character varying(255),
    mrp double precision,
    sellingprice double precision,
    quantity integer,
    inthebox character varying(255),
    isvariant character varying(255),
    status integer DEFAULT 0,
    category_type character varying(255),
    currency_symbol text,
    uniquepid text,
    vendorid integer,
    postalcode text,
    country text,
    category text,
    subcategory text,
    skuid text,
    images text[]
);
    DROP TABLE public.clothing;
       public         heap    postgres    false                       1259    17600    conversations    TABLE     �   CREATE TABLE public.conversations (
    conversation_id integer NOT NULL,
    customer_id integer NOT NULL,
    vendor_id integer NOT NULL,
    conversation_user_type text NOT NULL
);
 !   DROP TABLE public.conversations;
       public         heap    postgres    false                       1259    17599 !   conversations_conversation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conversations_conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.conversations_conversation_id_seq;
       public          postgres    false    275            I           0    0 !   conversations_conversation_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.conversations_conversation_id_seq OWNED BY public.conversations.conversation_id;
          public          postgres    false    274            �            1259    16782    coupons    TABLE     >  CREATE TABLE public.coupons (
    coupon_id integer NOT NULL,
    coupon_code character varying(20) NOT NULL,
    discount_type character varying(20) NOT NULL,
    discount_amount numeric(10,2) NOT NULL,
    expiration_date date NOT NULL,
    vendorid integer,
    associated_products text[],
    created_date date
);
    DROP TABLE public.coupons;
       public         heap    postgres    false            �            1259    16787    coupons_coupon_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coupons_coupon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.coupons_coupon_id_seq;
       public          postgres    false    227            J           0    0    coupons_coupon_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.coupons_coupon_id_seq OWNED BY public.coupons.coupon_id;
          public          postgres    false    228            �            1259    16788    currency_values    TABLE     �   CREATE TABLE public.currency_values (
    id integer NOT NULL,
    usd numeric,
    kes numeric,
    eur numeric,
    etb numeric,
    sos numeric,
    inr numeric
);
 #   DROP TABLE public.currency_values;
       public         heap    postgres    false            �            1259    16793    currency_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.currency_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.currency_values_id_seq;
       public          postgres    false    229            K           0    0    currency_values_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.currency_values_id_seq OWNED BY public.currency_values.id;
          public          postgres    false    230                       1259    17057    customer_address    TABLE     C  CREATE TABLE public.customer_address (
    address_id integer NOT NULL,
    customer_id integer,
    given_name_address character varying(50),
    family_name_address character varying(50),
    email_address character varying(100),
    phone_address character varying(20),
    country_address character varying(50),
    zip_address character varying(15),
    city_address character varying(50),
    subregion_address character varying(50),
    region_address character varying(50),
    note_address text,
    default_address boolean,
    apt_address text,
    phone_code text
);
 $   DROP TABLE public.customer_address;
       public         heap    postgres    false                       1259    17056    customer_address_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.customer_address_address_id_seq;
       public          postgres    false    269            L           0    0    customer_address_address_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.customer_address_address_id_seq OWNED BY public.customer_address.address_id;
          public          postgres    false    268            �            1259    16794    customer_delivery_address    TABLE       CREATE TABLE public.customer_delivery_address (
    id integer NOT NULL,
    customer_id integer,
    first_name character varying(255),
    last_name character varying(255),
    selected_country character varying(255),
    street_address text,
    apartment character varying(255),
    selected_city character varying(255),
    selected_state character varying(255),
    zip_code character varying(20),
    email character varying(255),
    phone_number character varying(20),
    orderid integer,
    unique_order_id integer
);
 -   DROP TABLE public.customer_delivery_address;
       public         heap    postgres    false            �            1259    16799     customer_delivery_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_delivery_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.customer_delivery_address_id_seq;
       public          postgres    false    231            M           0    0     customer_delivery_address_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.customer_delivery_address_id_seq OWNED BY public.customer_delivery_address.id;
          public          postgres    false    232            �            1259    16800    customer_follows    TABLE     �   CREATE TABLE public.customer_follows (
    follow_id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    follow_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public.customer_follows;
       public         heap    postgres    false            �            1259    16804    customer_follows_follow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_follows_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.customer_follows_follow_id_seq;
       public          postgres    false    233            N           0    0    customer_follows_follow_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.customer_follows_follow_id_seq OWNED BY public.customer_follows.follow_id;
          public          postgres    false    234            �            1259    16805    customer_wishlist    TABLE     {  CREATE TABLE public.customer_wishlist (
    wishlist_id integer NOT NULL,
    customer_id integer NOT NULL,
    uniqueid character varying(255),
    label character varying(255),
    category character varying(50),
    subcategory character varying(50),
    vendor_id integer,
    mrp double precision,
    sellingprice double precision,
    created_on character varying(255)
);
 %   DROP TABLE public.customer_wishlist;
       public         heap    postgres    false            �            1259    16810 !   customer_wishlist_wishlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_wishlist_wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.customer_wishlist_wishlist_id_seq;
       public          postgres    false    235            O           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.customer_wishlist_wishlist_id_seq OWNED BY public.customer_wishlist.wishlist_id;
          public          postgres    false    236            �            1259    16811 	   customers    TABLE     �  CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    given_name character varying(50) NOT NULL,
    family_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone_number character varying(20),
    address_line_1 character varying(100),
    address_line_2 character varying(100),
    city character varying(100),
    state character varying(100),
    zip_code character varying(100),
    country character varying(100),
    bio text,
    verified_with text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status integer DEFAULT 0 NOT NULL,
    picture character varying(255),
    google_id character varying(255),
    facebook_id character varying(255),
    verification_code integer,
    verification_expire_date timestamp without time zone,
    customer_loggedid text,
    customer_interest text[]
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16819    customers_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.customers_customer_id_seq;
       public          postgres    false    237            P           0    0    customers_customer_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;
          public          postgres    false    238            �            1259    16820 "   fashionclothing_product_fac_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fashionclothing_product_fac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.fashionclothing_product_fac_id_seq;
       public          postgres    false    226            Q           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.fashionclothing_product_fac_id_seq OWNED BY public.clothing.product_fac_id;
          public          postgres    false    239                       1259    17047 
   homebanner    TABLE     p   CREATE TABLE public.homebanner (
    id integer NOT NULL,
    banner_url text,
    title text,
    link text
);
    DROP TABLE public.homebanner;
       public         heap    postgres    false            
           1259    17046    homebanner_new_id_seq    SEQUENCE     �   CREATE SEQUENCE public.homebanner_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.homebanner_new_id_seq;
       public          postgres    false    267            R           0    0    homebanner_new_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.homebanner_new_id_seq OWNED BY public.homebanner.id;
          public          postgres    false    266            �            1259    16821    laptopcomputers    TABLE     <  CREATE TABLE public.laptopcomputers (
    product_lc_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subcategory character varying(255),
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    condition text,
    skuid text,
    mrp text,
    sellingprice text,
    localdeliverycharge text,
    zonaldeliverycharge text,
    nationaldeliverycharge text,
    weightkg text,
    lengthcm text,
    breadthcm text,
    heightcm text,
    countryoforigin text,
    manufacturername text,
    packerdetails text,
    additionaldescription text,
    searchkeywords text,
    salespackage text,
    keyfeatures text,
    videourl text,
    modelname text,
    processor text,
    ram text,
    storagetype text,
    storagecapacity text,
    displaysize text,
    screenresolution text,
    graphicscard text,
    operatingsystem text,
    connectivityports text,
    batterylife text,
    keyboardtype text,
    touchpad text,
    dimensions text,
    weight text,
    warrantyinformation text,
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 #   DROP TABLE public.laptopcomputers;
       public         heap    postgres    false            �            1259    16831 !   laptopcomputers_product_lc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.laptopcomputers_product_lc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.laptopcomputers_product_lc_id_seq;
       public          postgres    false    240            S           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.laptopcomputers_product_lc_id_seq OWNED BY public.laptopcomputers.product_lc_id;
          public          postgres    false    241                       1259    34030    media_library    TABLE       CREATE TABLE public.media_library (
    media_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    file_path character varying(255) NOT NULL,
    creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    vendor_id integer
);
 !   DROP TABLE public.media_library;
       public         heap    postgres    false                       1259    34029    media_library_media_id_seq    SEQUENCE     �   CREATE SEQUENCE public.media_library_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.media_library_media_id_seq;
       public          postgres    false    282            T           0    0    media_library_media_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.media_library_media_id_seq OWNED BY public.media_library.media_id;
          public          postgres    false    281                       1259    17619    messages    TABLE       CREATE TABLE public.messages (
    message_id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    content text NOT NULL,
    user_type text NOT NULL,
    "timestamp" timestamp with time zone
);
    DROP TABLE public.messages;
       public         heap    postgres    false                       1259    17618    messages_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.messages_message_id_seq;
       public          postgres    false    277            U           0    0    messages_message_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;
          public          postgres    false    276            �            1259    16832    mobileelectronics    TABLE     ,  CREATE TABLE public.mobileelectronics (
    product_me_id integer NOT NULL,
    ad_title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    currency_symbol character varying(10),
    category character varying(100),
    subcategory character varying(100),
    condition character varying(50),
    brand character varying(100),
    is_featured boolean DEFAULT false,
    vendorid integer,
    rejection_reason text,
    status integer DEFAULT 0,
    uniquepid character varying(50),
    category_type character varying(255),
    modelname text,
    storagetype text,
    storagecapacity text,
    displaysize text,
    connectivityports text,
    batterylife text,
    dimensions text,
    weight text,
    warrantyinformation text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    processor text,
    ram text,
    graphicscard text,
    operatingsystem text,
    keyboardtype text,
    postalcode text,
    simcard text,
    unlockstatus text,
    cameraresolution text,
    inthebox text,
    images text[]
);
 %   DROP TABLE public.mobileelectronics;
       public         heap    postgres    false                       1259    17588    mobilehomebanner    TABLE       CREATE TABLE public.mobilehomebanner (
    id integer NOT NULL,
    mobilebanner_url character varying(255) DEFAULT NULL::character varying,
    title character varying(100) DEFAULT NULL::character varying,
    link character varying(255) DEFAULT NULL::character varying
);
 $   DROP TABLE public.mobilehomebanner;
       public         heap    postgres    false                       1259    17587    mobilehomebanner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mobilehomebanner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mobilehomebanner_id_seq;
       public          postgres    false    273            V           0    0    mobilehomebanner_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.mobilehomebanner_id_seq OWNED BY public.mobilehomebanner.id;
          public          postgres    false    272            �            1259    16841    payments    TABLE     B  CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    customer_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_date timestamp without time zone NOT NULL,
    payment_method character varying(255) NOT NULL,
    payment_amount numeric(10,2) NOT NULL,
    payment_status character varying(50) NOT NULL,
    billing_address text,
    billing_city character varying(100),
    billing_state character varying(100),
    billing_zip character varying(20),
    currency_code character(3),
    payment_source character varying(255),
    vendor_id integer
);
    DROP TABLE public.payments;
       public         heap    postgres    false            �            1259    16846    payments_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public          postgres    false    243            W           0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public          postgres    false    244            �            1259    16847 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_mobile_electronics_product_me_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.product_mobile_electronics_product_me_id_seq;
       public          postgres    false    242            X           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE OWNED BY     t   ALTER SEQUENCE public.product_mobile_electronics_product_me_id_seq OWNED BY public.mobileelectronics.product_me_id;
          public          postgres    false    245            �            1259    16848    products    TABLE     t  CREATE TABLE public.products (
    id integer NOT NULL,
    ad_title character varying(255),
    city character varying(255),
    state character varying(255),
    country character varying(255),
    currency_symbol character varying(255),
    category character varying(255),
    subcategory character varying(255),
    vendorid integer,
    uniquepid integer,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails text,
    additionaldescription text,
    searchkeywords text,
    keyfeatures text,
    videourl character varying(255),
    category_type character varying(255),
    quantity integer,
    postalcode character varying(255),
    salespackage text,
    brand character varying(255),
    condition character varying(255),
    isvariant text,
    status integer DEFAULT 0,
    updated_at_product timestamp with time zone,
    rejection_reason text,
    slug_subcat text,
    slug_cat text,
    images text[],
    attributes_specification json DEFAULT '{}'::json,
    prod_slug text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16854    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    246            Y           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    247            �            1259    16855    ratings_and_reviews    TABLE     	  CREATE TABLE public.ratings_and_reviews (
    id integer NOT NULL,
    vendor_id integer,
    customer_id integer,
    rating integer,
    review_text text,
    medias text[],
    created_at timestamp without time zone,
    product_uniqueid text,
    label text
);
 '   DROP TABLE public.ratings_and_reviews;
       public         heap    postgres    false            �            1259    16860    ratings_and_reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_and_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.ratings_and_reviews_id_seq;
       public          postgres    false    248            Z           0    0    ratings_and_reviews_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.ratings_and_reviews_id_seq OWNED BY public.ratings_and_reviews.id;
          public          postgres    false    249            �            1259    16861    social_logins    TABLE     �   CREATE TABLE public.social_logins (
    login_id integer NOT NULL,
    customer_id integer NOT NULL,
    provider character varying(50) NOT NULL,
    provider_user_id character varying(255) NOT NULL
);
 !   DROP TABLE public.social_logins;
       public         heap    postgres    false            �            1259    16864    social_logins_login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.social_logins_login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.social_logins_login_id_seq;
       public          postgres    false    250            [           0    0    social_logins_login_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.social_logins_login_id_seq OWNED BY public.social_logins.login_id;
          public          postgres    false    251            �            1259    16865    subcategories    TABLE     �  CREATE TABLE public.subcategories (
    subcategory_id integer NOT NULL,
    subcategory_name character varying(255) NOT NULL,
    subcategory_description text,
    subcategory_image_url character varying(255),
    parent_category_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    isfeatured boolean
);
 !   DROP TABLE public.subcategories;
       public         heap    postgres    false            �            1259    16872     subcategories_subcategory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subcategories_subcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.subcategories_subcategory_id_seq;
       public          postgres    false    252            \           0    0     subcategories_subcategory_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.subcategories_subcategory_id_seq OWNED BY public.subcategories.subcategory_id;
          public          postgres    false    253            �            1259    16873 
   superadmin    TABLE       CREATE TABLE public.superadmin (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "userId" character varying(255),
    role_id integer[],
    "position" character varying(255),
    name character varying(255)
);
    DROP TABLE public.superadmin;
       public         heap    postgres    false            �            1259    16878    superadmin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.superadmin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.superadmin_id_seq;
       public          postgres    false    254            ]           0    0    superadmin_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.superadmin_id_seq OWNED BY public.superadmin.id;
          public          postgres    false    255                       1259    17676    transactions    TABLE     �  CREATE TABLE public.transactions (
    id integer NOT NULL,
    transaction_id text NOT NULL,
    customer_id integer NOT NULL,
    transaction_external_id character varying(255) NOT NULL,
    amount numeric(15,2) NOT NULL,
    currency_code character varying(3) NOT NULL,
    transaction_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_verified boolean DEFAULT false,
    verification_date timestamp with time zone,
    payment_method character varying(50),
    notes text,
    CONSTRAINT ck_amount CHECK ((amount > (0)::numeric)),
    CONSTRAINT ck_currency_code CHECK ((char_length((currency_code)::text) = 3)),
    CONSTRAINT ck_payment_method CHECK (((payment_method IS NULL) OR (char_length((payment_method)::text) <= 50)))
);
     DROP TABLE public.transactions;
       public         heap    postgres    false                       1259    17675    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    279            ^           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    278                       1259    17695    transactions_id_seqs    SEQUENCE     }   CREATE SEQUENCE public.transactions_id_seqs
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.transactions_id_seqs;
       public          postgres    false                        1259    16879    variantproducts    TABLE       CREATE TABLE public.variantproducts (
    variant_id integer NOT NULL,
    product_uniqueid character varying(255),
    variant_mrp numeric(10,2),
    variant_sellingprice numeric(10,2),
    variant_skuid character varying(255),
    variant_quantity integer,
    variantsvalues text,
    label text,
    vendori_id integer,
    variant_category text,
    variant_subcategory text
);
 #   DROP TABLE public.variantproducts;
       public         heap    postgres    false                       1259    16884    variantproducts_variant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variantproducts_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.variantproducts_variant_id_seq;
       public          postgres    false    256            _           0    0    variantproducts_variant_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.variantproducts_variant_id_seq OWNED BY public.variantproducts.variant_id;
          public          postgres    false    257                       1259    17517    vendorclaim    TABLE     �  CREATE TABLE public.vendorclaim (
    claim_id integer NOT NULL,
    vendor_id integer,
    claim_description text NOT NULL,
    claim_status character varying(50) DEFAULT 'Pending'::character varying,
    claim_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reply_description text,
    reply_date timestamp without time zone,
    closure_description text,
    closure_date timestamp without time zone,
    image_files jsonb,
    video_files text
);
    DROP TABLE public.vendorclaim;
       public         heap    postgres    false                       1259    17516    vendorclaim_claim_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorclaim_claim_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendorclaim_claim_id_seq;
       public          postgres    false    271            `           0    0    vendorclaim_claim_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendorclaim_claim_id_seq OWNED BY public.vendorclaim.claim_id;
          public          postgres    false    270                       1259    16885    vendorproductorder    TABLE     �  CREATE TABLE public.vendorproductorder (
    order_id integer NOT NULL,
    vendor_id integer,
    product_uniqueid integer,
    customer_id integer,
    order_date timestamp without time zone,
    total_amount numeric(10,2),
    order_status character varying(50),
    rejection_reason text,
    product_name character varying(255),
    customer_name character varying(255),
    product_image text,
    customer_email character varying(255),
    customer_phone_number character varying(20),
    created_at timestamp without time zone DEFAULT now(),
    currency_symbol character varying(10),
    payment_method character varying(50),
    payment_status character varying(50),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    brand character varying(100),
    category character varying(100),
    subcategory character varying(100),
    product_type character varying(50),
    transaction_id character varying(255) DEFAULT NULL::character varying,
    commission_fee numeric,
    withdrawal_amount numeric,
    refund_amount numeric,
    fees_paid numeric,
    tax_collected numeric,
    orderid text,
    quantity integer,
    label text,
    tentative_delivery_date text,
    skuid_order text
);
 &   DROP TABLE public.vendorproductorder;
       public         heap    postgres    false                       1259    16892    vendorproductorder_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorproductorder_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.vendorproductorder_order_id_seq;
       public          postgres    false    258            a           0    0    vendorproductorder_order_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.vendorproductorder_order_id_seq OWNED BY public.vendorproductorder.order_id;
          public          postgres    false    259                       1259    16893    vendors    TABLE     	  CREATE TABLE public.vendors (
    id integer NOT NULL,
    country_code character varying(10) NOT NULL,
    mobile_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    brand_name character varying(255),
    business_model character varying(255),
    products jsonb,
    trademark_certificate jsonb,
    company_name character varying(255),
    company_city character varying(255),
    company_state character varying(255),
    company_country character varying(255),
    company_zip_code character varying(255),
    shipping_address character varying(255),
    bank_name character varying(255),
    bank_account_number character varying(50),
    bank_routing_number character varying(50),
    bank_account_name character varying(255),
    bank_branch character varying(255),
    bank_swift_code character varying(50),
    registration_date character varying(255),
    mobile_verification_status boolean,
    email_verification_status boolean,
    status integer DEFAULT 0,
    business_type character varying(255),
    registration_number character varying(50),
    tax_id_number character varying(255),
    business_address character varying(255),
    business_phone character varying(255),
    business_email character varying(255),
    business_website character varying(255),
    business_description character varying(255),
    facebook_url character varying(255),
    instagram_url character varying(255),
    twitter_url character varying(255),
    linkedin_url character varying(255),
    business_logo_url character varying(255),
    business_license_url character varying(255),
    return_policy text,
    shipping_policy text,
    terms_and_conditions text,
    payment_info text,
    shipping_info text,
    support_contact character varying(100),
    categories text,
    average_rating numeric(3,2),
    total_products integer,
    total_sales numeric(10,2),
    support_contact_1 character varying(255),
    support_contact_2 character varying(255),
    vendor_profile_picture_url jsonb,
    brand_logo jsonb,
    useridvendor character varying(255),
    vendorname text,
    email_otp character varying(4),
    mobile_otp character varying(4),
    reset_otp text,
    followers integer,
    following integer
);
    DROP TABLE public.vendors;
       public         heap    postgres    false                       1259    16899    vendors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.vendors_id_seq;
       public          postgres    false    260            b           0    0    vendors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;
          public          postgres    false    261                       1259    16900    vendors_notifications    TABLE     �   CREATE TABLE public.vendors_notifications (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    date text NOT NULL
);
 )   DROP TABLE public.vendors_notifications;
       public         heap    postgres    false                       1259    16905    vendors_notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendors_notifications_id_seq;
       public          postgres    false    262            c           0    0    vendors_notifications_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendors_notifications_id_seq OWNED BY public.vendors_notifications.id;
          public          postgres    false    263                       1259    16906    withdrawals    TABLE       CREATE TABLE public.withdrawals (
    withdrawal_id integer NOT NULL,
    vendor_id integer NOT NULL,
    currency_code character varying(100) NOT NULL,
    amount numeric(10,2) NOT NULL,
    withdrawal_date date NOT NULL,
    status character varying(20) NOT NULL,
    bank_account_number character varying(20) NOT NULL,
    bank_name character varying(100) NOT NULL,
    bank_branch character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.withdrawals;
       public         heap    postgres    false            	           1259    16911    withdrawals_withdrawal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.withdrawals_withdrawal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.withdrawals_withdrawal_id_seq;
       public          postgres    false    264            d           0    0    withdrawals_withdrawal_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.withdrawals_withdrawal_id_seq OWNED BY public.withdrawals.withdrawal_id;
          public          postgres    false    265            �           2604    34094    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
 F   ALTER TABLE public.attributes ALTER COLUMN attribute_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    34095    audioheadphones product_ah_id    DEFAULT     �   ALTER TABLE ONLY public.audioheadphones ALTER COLUMN product_ah_id SET DEFAULT nextval('public.audio_headphones_product_ah_id_seq'::regclass);
 L   ALTER TABLE public.audioheadphones ALTER COLUMN product_ah_id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    34096    cameraphotography product_cp_id    DEFAULT     �   ALTER TABLE ONLY public.cameraphotography ALTER COLUMN product_cp_id SET DEFAULT nextval('public.camera_photography_product_cp_id_seq'::regclass);
 N   ALTER TABLE public.cameraphotography ALTER COLUMN product_cp_id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    34097    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    34098    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    34099    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    239    226                       2604    34100    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    274    275    275            �           2604    34101    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    34102    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    34103    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    269    268    269            �           2604    34104    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    34105    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    34106    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    34107    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237            �           2604    34108    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    267    267            �           2604    34109    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240            
           2604    34110    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    282    281    282                       2604    34111    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    276    277    277            �           2604    34112    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242                       2604    34113    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    273    273            �           2604    34114    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    34115    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246            �           2604    34116    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248            �           2604    34117    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    251    250            �           2604    34118    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    253    252            �           2604    34119    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254                       2604    34120    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    279    278    279            �           2604    34121    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            �           2604    34122    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    270    271    271            �           2604    34123    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258            �           2604    34124 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260            �           2604    34125    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262            �           2604    34126    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            �          0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   _�      �          0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   ��      �          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   ��                 0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   ��                0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type) FROM stdin;
    public          postgres    false    224    �                0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   V�      5          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   �                0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   R�                0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   �      /          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   W�      	          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   l�                0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   ��                0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   �                0    16811 	   customers 
   TABLE DATA           P  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest) FROM stdin;
    public          postgres    false    237   "�      -          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   �                0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   ��      <          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   ��      7          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   ��                0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   ��      3          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   ��                0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243   }�                0    16848    products 
   TABLE DATA           �  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug) FROM stdin;
    public          postgres    false    246   ʾ                0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label) FROM stdin;
    public          postgres    false    248   ��                0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250   ��                0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured) FROM stdin;
    public          postgres    false    252   ��                 0    16873 
   superadmin 
   TABLE DATA           ^   COPY public.superadmin (id, email, password, "userId", role_id, "position", name) FROM stdin;
    public          postgres    false    254   1�      9          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   ��      "          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   8      1          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   �      $          0    16885    vendorproductorder 
   TABLE DATA             COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, order_date, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, created_at, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order) FROM stdin;
    public          postgres    false    258   �      &          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following) FROM stdin;
    public          postgres    false    260   �      (          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   �
      *          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   �      e           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 16, true);
          public          postgres    false    217            f           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    219            g           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    221            h           0    0    cart_cart_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_cart_id_seq', 642, true);
          public          postgres    false    223            i           0    0    categories_category_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_category_id_seq', 63, true);
          public          postgres    false    225            j           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 3, true);
          public          postgres    false    274            k           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 8, true);
          public          postgres    false    228            l           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    230            m           0    0    customer_address_address_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 31, true);
          public          postgres    false    268            n           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 154, true);
          public          postgres    false    232            o           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    234            p           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 102, true);
          public          postgres    false    236            q           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 176, true);
          public          postgres    false    238            r           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    239            s           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    266            t           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    241            u           0    0    media_library_media_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.media_library_media_id_seq', 33, true);
          public          postgres    false    281            v           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 163, true);
          public          postgres    false    276            w           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    272            x           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 71, true);
          public          postgres    false    244            y           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    245            z           0    0    products_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_id_seq', 1154, true);
          public          postgres    false    247            {           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 141, true);
          public          postgres    false    249            |           0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    251            }           0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 183, true);
          public          postgres    false    253            ~           0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 22, true);
          public          postgres    false    255                       0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    278            �           0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    280            �           0    0    variantproducts_variant_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 91, true);
          public          postgres    false    257            �           0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    270            �           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 177, true);
          public          postgres    false    259            �           0    0    vendors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.vendors_id_seq', 67, true);
          public          postgres    false    261            �           0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 39, true);
          public          postgres    false    263            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    265                       2606    16938    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    216                       2606    16940 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    218                       2606    16942 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    220                       2606    16944    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222                       2606    16946    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            U           2606    17607 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    275    275            W           2606    17605     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    275                       2606    16948    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    227                       2606    16950 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    229            O           2606    17064 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    269                        2606    16952 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    231            "           2606    16954 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    233            $           2606    16956 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    235            '           2606    16958    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    237            )           2606    16960    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    237                       2606    16962    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    226            M           2606    17054    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    267            +           2606    16964 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    240            ^           2606    34038     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    282            Y           2606    17627    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    277            S           2606    17598 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    273            /           2606    16966    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    243            -           2606    16968 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    242            1           2606    16970    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    246            7           2606    16972 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    248            9           2606    16974 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    250    250            ;           2606    16976     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    250            =           2606    16978     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    252            ?           2606    16980    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    254            A           2606    16982    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    254            \           2606    17688    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    279            3           2606    34053    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    246    246            C           2606    16984 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    256            Q           2606    17526    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    271            E           2606    16986 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    258            I           2606    16988 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    262            G           2606    16990    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    260            K           2606    16992    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    264            4           1259    16993    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    248            %           1259    16994 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    235            Z           1259    17694    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    279            5           1259    16995    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    248            _           2606    17001    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    237    222    4905            `           2606    17006    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    4935    260    222            g           2606    17608 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    237    275    4905            h           2606    17613 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    275    4935    260            a           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    233    4905    237            b           2606    17016 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    237    233    4905            c           2606    17021 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    4905    235    237            j           2606    17689    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    4905    237    279            i           2606    17628 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    275    277    4951            d           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    4905    250    237            e           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    224    252    4888            f           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    4935    271    260            �   3   x�34�άJ嬎��	�����M�+v��/���K�r=2���b���� ��t      �   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      �   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^          S  x����j�0���S�"�+��n�$��r�!�ڐX�������	�����i��fh��J�u54m�u�!�6l��|C�r� *�r�4e䜴}bV.#g�S�3p����Ͷg�$����M�8<Ʒ�p�}_��[�8~�*]���H�
+���^ H8 ����2��id�]�����C��zi��S�7�Wd�%�χ�V�9)7SpM��Uق����ZU��+�	rgrN�Ksl��WɈ%��瑂�\���2'$�sV��8A���u;v����C��!�>m���~G3^�G�`�ȵ�H�������(~ ���"         &  x����n�H������3s�F�n^'��� 10� -�m"�(����TSK3�IQ�N���UյXt����%ՈS.0u����	���4~��o���S_](��)���29�
��&�_|Qn?.�_a����k(�8��iz0ǥ_��W����'Y�[.j'Jk�TvH�\}�ټ~M��,��륯�ӌ�[)޹����]��u*�`�r>$E^���U>��q�>8���\)�6ǿI�͢���%�~�o|�=�V����Χ�rcLS���#�p�۪(�P�����(�^@c�4��T��a$��pC���w��-})��zZW������e�̧z�ۤ~ͫ>U��I��I�T��d�i���X~_��;&���Ws�MҼ�	g�)��"�B���*����t�(i%���O��`?Lf1e	3!&�E�J���>�^!F��)��*ʼ� �3Bs��N��ө�ov"$�P����h�'���O�
m�S�X��J�D��Dk��H�@��?�<<��G�RȬr���G�#�Q��t������e�wV����pX��3�$aZ9��-m)2��4�L�}����T�R%�a����|4�2�j�"�E�Ŷjb�� �0��M���0�}A�uRt�X[:I����G��Y�bP)�\�Z
�,x����1�N8�%Pg���H�v�,dfR@�e�J%w3,�qo?�L1b��I����Q}�r����3���O�	��Q�h���R��j]����O��1G��4L�)ӻ�H�F���i��7��'N0ũ��LG�pG�0\��ȣ���gh��ا�E�~�Z͇z�TB��w4���m4��R#i�M����UY�M1;C�4B�0� l{��S�-aI�"��E|�~xN*�c�1N��#�|N��slK�ɶ�QCR��Cyk';g�8�0U_膤H�v��*TO������e4�%(a�BIG.E��&S���˪.װ8�����N��j��3��iA�ݶ-E@����������8���߮T딠�ږ���WX��
�a�5�(gp0Mw��y��`���n�(E��6��'�`��a�ϏT嚉N�H%�7U�կ���'S�f��ɔ�<F�I	''�ݖۖ"�CwPk�>�������T�u��1v�gp�}/C�L'|-�ȧaOk6�I5�9;�ɍ6����G&��V�!)�1�Xf?����Zy���z��c��K�%��*�>�w.�^N��)'�0�����99� 7�"���̞��(�(4�C��ø� �DH�����7����\\\��ήx         �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      5   *   x�3�47�42�L.-.��M-�2�47A0	�!	��qqq �]�         �   x�m�A�0��ۯ��mf�1��THR�.#?RZ3���֥:ty/����##"X��]���<$aD���G]��y~ �҄���;]��c���JuA���\����ǳ\$��c�s֨a��AI˦��4��
ʫ�+�Z�&������[i^�4E�j۟������߿"���R��d=�         ,   x���  �7ÕSl����01�QJw!��.���'�yv      /     x���=o�0����[E��["u�Y��r���L�I����EEt���N:�鹗k`T@^���F�;�>��վkA�T�Lp��:Ii�8����xH6�
���P=B��#�x�,)���0*��0�p3yl��b ;��ɸ�i�43Pv-6K�^����"�٦��ϰ��iX�x&R����hqmw� ��=yq.����E��`�d���,9����`lq�)�3v<1�S΄f�/�q��m"�����VI�|zI��      	   x  x�͘Mo�6��ԯ�=��Ù��m�,���A��i/�ȍ��R`y����/��5HQ� �щ�wf8��]�r7���v;N7�~ܯ��u�g��4��}��i�ߝ|����u�V�.���:�>Rp�K$�"oo�uܜ^�[稈�1�#_����E�a�o�����:N�r\���y�lV���7��q^�>���n����=�m�������۬NW�;a��7�)���R!G仜]�~^O�ݼz)�X�*P�.��h�h�YY#C6tŻD/�(�D�h�$w�����K�ҕ`!��Ԥ���v�]�/.B�9���bW�X2uE[`M��+�!B6w%6١�ep����F
܆�\�G�-��r������
��7��t%Y�/G�1�F�w����E왤�0P����S�D[:xL�4�������c��HԈ��VBG�7�\�_ǡ�mӞM\p?M�~5�W�����gۻ50���ݪ����cӾ��`�?��L�w�n\��oQ�w�QX��!�G�� @%2��,��,�Wm����-TXȭ`�2�=�M�cv��N���q��]|�~�����c����z��V���L!ݖ\�b/� �F�)����B�l�����@5���+�r���]�0�j	�Wm!0M�(�"�ih����D�� *vh|�dK}��W�Q�h�X�m�cܼ�`�Ϟ0���G����h��wc��K2D��ċ��J�� 3�B4&/Y�; f������8R2��w�MD9��v^�m5���M4+�h�$ ��Ƣ�Q0�QN!qh6<:�]� �X��T ��F�){,jS��a��W )$k_L
�F-�C��J�X��J�mD�92+�E��v0V�8ب�\�F�(��l�k����q��Sp�������Q�(�,��)��FT�A���*��$�ܶ�%6�R��1�Z�ĈK83*���%1�JXj�.��"v݉�#�$F\���ں�LbD&�O��E�I��T�����l#6IД���"�$FlR��Բ)�Mb�&J�9�6 �ĊMH'���ФFh�Gd�g^���L�����C�I@�>�����#���}%�J�X�琱�	�R#f�$)�S@JݧӮ���2<�            x������ � �           x����j�0е�������J���B�d#�i-� ���Jv�&�w��mQ�%g�G[�:?�M�BJC��С�OU�G��5Ŕݭ0��X�V���p�8�Zc&��\��ۅ�R{s���X^ai�,��
&�\�л��˷���~�2�O>*F�)Ga�'���[�-'�MU56D��fJ���XB�j�J�	<K�1��9��BNs�����uEK��׽���GO�v���1�-ELՎ�M�� FL{�         �  x��Yio�����+��ZU�s���e�0�U�2؀�c3_���c�BPb��N���� CZ�v,�l�3k�9�������������Å�i��<~��-c��KC �(�Q�#��c�%"�DP��V^�Ŝ	��ǳց��5_��;f���X_���t0,k�\�dH�����zJmI���߮\g��w Yt�AH ��S�	gD�(���m61�Zsb��@f��b6YL���o���w�#Y������V6cm��������`8h��(�K'*�gh�bm#)#X)��-����i�����Hse���h㫩d�8aquF0���#��U�wVE����O��^���a}��=K��j�6p�d�1.?�.� �x�8EqDuɤ��./�@lG05mF���/y�=^Ze7Zo��Va��vk�ݭĠ}�:&R @(b�J*$S>��@��!���Qk�`4�΂oCq ��K���h�u�Z������J�(T�@LP� F�h�v���O��z~� �8F����K��i�y�3������f�ɔI�V/�j�N1#��z�O{�Y��tw�,m��O�"W(.*���HFf�/v�D(���BqBT>�s��3�0"�V��E�M���M-0���_�ݹU��fJ5D�胭��v��j�:����LF��ﭘ��.���Q��%��K�3�e�ú(�aA .�N��gX��U*�t�[A��K�1ۼe�ԪZ
��Z���l���i�9�������?��(�J�޸���Cu�@�S�Lt��w��Y^2�hgH���bV_�[����Q
y�i�3��a��F�����)84(����#L3̛���
���~��ń�8��:�L�(9 )��*�#{n8s�ӽ����n΄qx>�
k��7|�]�����x	�gךK[�bے���sb57g�l�{�z��fv�T�9�h�3~�=�*ba�c@ �M�K;����W&�w]����B�U��8!��<(��U� e���C��;���8r�/�^ }������!�M�f�q�����~�N 0�t፤���������@ov�x&O:�
(YG�2�L��B�XZB�!:g��Lti�h�FQ	H)*o��*n1=��kS3x�=��ׅ^��ֺ��z�VR�%n#���^�^3/[�6f���]P*ԑ�]D���Aaq
����T�*��vS���ܤp:�Cm�Y�us�b��гV��23o��M�r��Y1�*��Z@�C`��j�HuRW=�Y�J��Gu7wz��ѥV���B{T(�s���jGƈ9	z�2�4�te�7]��1_1�`Xۍ�z��*we�5�;�#���K@��1�U%�*f����B��1/:+^����GP��Om	���N�2a�-�H��v�6=�JQ��]r(�K3�F8������;U*P���B*C���=�5A1�K�(�S��(��*����rqV����w{ �O�W�8L�Nn�/}�9����@y��ɥ�Zk�κ�]/�K����]��8�:��Lt���\�{�xBt����r���f���7���Y�Y/o�Jo��=e�J3!�P�+}�b���Aa�$��DWPXB��Q�	�6�*?cڭKC1�NfӍH63���m����r�/��S���\/�l?y-f�xkz�١O,�`=d���0t�g�w�+��ӳ⵷$���!�0_�WˇZo��=�"=�ɏ�u?�#�f��y��֛�ܮ��fό�"S�����= 9�O*p�T��4�Vk6/K{�)}5���2��ֲzm�L����j.��rU�I��j��9��ǔ��C�,ٽ�nDWʀ�{t�:��xd��%``6��$����g��K�`�LN��v>��ha)��i
^uo|w�	[&��v��3���=��ǎ�4����A�� ,��{�
�	�W�� k�=��� �����|��:�#�1�����@B�O��G�{H��C�E�ZƎ�x�`�zv�#�u�����t�n��t��7VWߏ�ew����w�Rv1[&7��aí�'�j���Ο��
+����G��54�@���ϊ�tʶh�����p]r����[971��#qЌ�^�z���rX�k�kK���̬$�9�v�5���Ǹ�͒f3�:p�w�v�4  ~�d�z��B��jr�>}��$Q�GE$�'Y��)j��k�Ǒ������ȱ��:�|\�|h�Q�Ҏw���FLkc9��������Ð�	��:�>��S�rF�я[$�d�pR��\��-�}����/X��)�������6������@nD���H��蝼��z6S6e�;����^���@�Jf���z�<���H��@�"T>]3*ni�3��V������y����3=�@�#Mcj�����l�����ȸ�¤cx$]D����jF�Kb��O��d_��jgX�����G�6�[�F�p-��
9�"6;DƩT���g"�8.��I
����t\�.A�j�Z�=���^�K���C��j�|!���
^�P��&��s����b��,v����h�]�W��Q�����er���*e5��f	-jKg�Z�ǔ��t�r��~(z_p���Q$qpV|�\��6�vp${6��������[=�~\��BUq}&z�K��L��QWYyeDg�b#�llǎ��s�m�r^���y��� ���0�j�8���v�|��8�	�m0\��?�P��Q.���A߀�d���=����dova�����:���n�W��l�&�>2���o���2�� �WS��.xX��ٍI	!��Z�v'}�2 qw$����c;�����i~�N&���E��(�$X���-G����_�P�a<�"\�!B9��D�׷K���{-L�pZm7�\̣fP2�1X�z'���rn^���H ����
���o��������f��      -   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�         �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      <   �  x���Mo1��s�+��b���>R�\�JUh�U�ҍ� ��g���=��5��������8����qs�i�����0N;t`T��ne�篇in����:�N���<>ϯo�2�.�Ҏp@���=9�;�ʰ!ߢ�Ll /��||�����q��?N����V�*%�j�i��  y�Ǖ8�=�yd��Wz�r��������rUID�y9汨���;�U��&C��45���Q��$,��#�yBu��R��qw��1�
	�U��*�6b*�;�"����h���Xœ�~�Pg� �3]ug~�|��]g(����W�Q[�F%��	��ꐷ���v���9���f��S�K�zruJ��gq�$����Hs�K�9�<���jGsܬ(���X����P3���K#��
�nw9�
)\�
��O���-O`�Kw�9�
)"�E\�]�%�[��V��X;��|6 ,��u��v����OW��      7   �  x����o�0��W����ɿ_�iQ�n��:��.Lha�P��~��kr��=��g�r�8JR	�^�btC�bz��7��P�i�y��H���@�Dl����m!�4��Th3�E���2�I�� �)�TiZ����j��;l�'����>� ����O�ƺ�~;)(�$��8���X�rN�g��/�$]�V��R�S��|����?T�aH
��X���
g���j�ͯS�\�w����H	�)�2[%I��9;�κ';�ӎ�')L�];5��C
�y��q�	�Brp�KY6&vu&�a|���}W�2?���\=ul��@R�M8��v��4� ���®�k�-o�=�̀s|���G�۷O�X:�(���<E>_��4�մe [��Ӏ�pכ|��1%v�l�V���gӛv�(�4��S����]��l�`�]E���^&�@��C�c7ǂm�j��y_��</��?}W���e�b�~>� pz��         P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      3   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S         =  x����N$7���S����n�D�6�i/���I�1��~��=3�t���q �?�U��l�;B��	�w w��H� �}~{������e�=t�����}7�?���������������kG~c�K���Ӵ2�!�ⷠ� ދ�aud���?��n�z������q�|�������������e���9ӧP,gM�z�$"�t�(@>EL_���o_�]w?>������u��kM��1~�,8ю,�[�A|@�-����wo���_#��s�!�IVH���.���gRFcJi��D�f�2��&(kR�I(�4�m�R,mH%&#����9���|EJQOx<��q��|C4s([�p�
Gq`�����9"L����9r�Q*�;��^���/��1n�#�{j�)RP4;���Az��xR�&'�V�)JH,�9�H��I��|��o�g�h5��X�ھ�G�8���b���s�N"��X�r5<�����Z�/enI��z�4��� T�	e�ܴ���9���[�A���E�!e_�'����K����V8���U�)6�8���{f��hV��9)�{I�):�>���1N4�O�������8Nс;#�K�z]���J�3ǠA<���fʫz+�כ�,J�:�y ꥾i�bM7�ն͘�`F�b��g�-����pX��nRt�$�6���IX?�H^�?���!$8�3��G:0tYO!3GꛜP�b�^C��Ѿ�R\W9� +���o&^-.H!QF�*��v�`׊�rJ�_=23�ƈx,j�W��&�E�6� ����,)'<���@� �� Eb���5 �euE6���rZZ�b�g=��N��`E	&)�y��  ��������|�#c�mP�<  ��+�-��`ET4�*G��d�J5:ޙQۂ�7e�*�����9�EX��=Щ���g+;�
�Ŀ|�L}LE�����,M��V��y�;��%���ぽ����_���L�dpv�hIr,�Q]�s���%A�tS�&�4����E�����"gq��r�a�F�>g_����� ��L�            x��}�r�H��3������ƾ���	Y�lOY�Ʋ�S7� IHD	� (Y]�"�#��<�����sN&� W��;��lK�2����&]\�͂�q�L5�O��c��7��K_?Hg��K�t�%��.����Dz��,��`�Jg� }V��ْe�bI��뺤���WIUM����G�.�_�;�R/	$>0�x~�5�g�'�'��� ������O�G?"����Gv���{�����/������S�MƎ���x_�#�d��;���q���"��~��I�����F�a�J*��.b��>�����tL��/)��h��j�f2�~�(/��X����b���x�o�C<K�T|�y0zg����,	`VaY��7�r]˱�ul]��Q{���?���=U1U�m��[�Q������ċF?���h
����C�y�,�����%9���UC ��B�f�Ls�3?�����^�N�`D�?b����F ��{����8H�v��o�%e�a����F��Jш�$�/�uB.�V\Ր�1�ล�J�[�?�G.x��������ԗ�ٷ]��!��XFZ��#�����N���=�2\��먮�|OS��f�e~x!��� �#ę�o>�z9��~�a�����&,���vM�HN�~��A&O�~�)�<�����r���Y: �yF����H�����4�6"3dg�S�yQ0�H-x����l���~r '�~�o�� ����4K`�����r�o�.TS����}ׅU���V�+�<�a��ۣO�d�>��|�����/���te�?��ƈP���l�fQL�˙��X��zD!#/�X�#`v��:��H2������Ͼ�l��������������oA
,��E�� ,0C��G3���� `��'}��O3_3�j������&�F>~C`����w~��|/����_O�r����,HpE1�	ȑ���?��V����5:=����	��}z���û�g�U���d�yC�	��1��O�t�}Y�Q��ipq�z�N�;�gC������G�4f׾���(� W& N�(�pĮI� "e��������`��3y`)n�QF�_�~��(��q��#a�-��`$�/�  G'�y��@p������/�|d@ ����Y�#.�� :gq����)l|��?��U���������| ��m�O�=`� ������d�EC��N"�û4�yf�A�� ^��,�}p糣a�Y���/�l0M�(��R�<�g��h�>y9L|� �!E���|p#�I�� ����q�����za�m�� ��F����j��_�[�h��:��$��30��-����b���C�������eP(I}��X���Kf���c���� ��1	��&�WC�Ui/u��+��Xʡ^��;C11����!��0�R�������W�@h*H��?��-��>D �+�d�)C����,����y0KP���.��đ�`R�jR �rc������e����s�g��HG��.>��|>�t���)h���6���<�Ѵɘ�YO���|��]xH?Ep�H���6(6GGG
�� y¥
ɔ�#�H��7�#B��$� �/����4Ea��~)&)3�}���g�S7R�Q8� r2xU�x�����k>Z���#~4��X)��CLC����!��5�N�c:r ��� =Q0�qE��r��O��]����,���H�+(��Is(��Ĥ��Xd���bz �A����Z�P���m?NP����B�����vp](I�+��DA
�i��(z�
�N�%�cǪ:�:G�@��蔶i��2"�c�*(��j+����긊q��c�����Hٞ���2BO�ʆ���Ŕ� ������� 9�I�<H�Ypn�5��#M��?	��AR+u}Fy)n�z#��Jm]��`�4)��G�z�p+F ������1� �b	����lE7E�`I�|
�� �o���7�۟1U2�Ńȍ&S��̴z(��>��V�dU��	���̜Y���ǩ�kW�cUُ����*ُ�ُUe?��؏����&c�LFs� ���Ŀݑ]��G�%�� 7$��/Á�"�lU)�nlC��>>m�`#l'�x��A���i�H<<8�(2^�	�!�'I'sd��&���8��4ԗ��7Ucu�!׸٢�MkJ7+�n!�e�ki�U��+�%��%�D-@\nq�J��e�fI^* QC����7v&/�|���o�G`������O��ʩ��9���
�٦��"3r"S�D�*MT�*�T�uNe���%�ip��̮Q���isT�=2�i*Ӟ6�isT��ʔ���> �99�i��Lk�ev+�Y��n�ĥ(��(��Ǝg'uNAT���VD�)���9�P=�	j������OW�S�e��ٻ�_��><ggQD��qs8(�k��<�m�@J�p�'z	�Q\��%۲���t�nܣ��ϗ�^�5���c=1®�~8
XUgS5��B��
$�ԵLGUL��9��5;|W޳�����$���HN8��''_ǉ�nZ��g�1�I��}?dG�i��f�M��ٗ H����h�m!7U5��6���97���En�Oɛf~,�d�LMA�~; �s�O�/Y�ೳ�:�L���O� 6s����@BE���V��Ib����\�թ�l<7zSxފ	�S)N)�SB�'72�2�>;��xRp�>;OF��(�_<+o�����N�mB�f^H��0ܔ����LW�vۓav���X8-(���'�lOfU���h�\��c=��	����ԑr���W.\�*GՕv�b�rU]�jb�� �����l3�9��I��x�"�������Ql�'�n�ě�XFh�<�(�:b�^̗8����rƉ�2����M���^2
��_ 4��VU�i,NM���|�k��O3C>��f3����dJ:�T��J�L1�8&Y!�^��h�y܎X���^Nn�����S,l��mMW�<:TT�)�&H�Y,렶�2���p�	���"�_��n����źK7v`�oܭ��Ǵ�v+ľӮ��C��(W9Ʈ6�.2Ӑ�{}~��@?�[��;�$ND��=�>��T>1� t/?���~������@j�i��&Y&Л�OԖY=QӜ�;��F�}ʫ�/��k+�ki��x���e?N剩 �Ln� �'���!}_���X���c'r��1����ֽ*S��Q�y�l��������u��5�2%�����1]^�s� �j���I>OTJNrf�����^�x�|Xp4�m
��Pp��m��ՁX���!��[Uih�*�Oq��;�q�H��>Ԅ���o�ݿ6m*W�>7s!�AyS��	t��5��᩾S\t�Rm6,���U��I�/"��T���&���{���BƖ�n����ȸijQ"�vsdl�0IT>�:2j5d��& ���9���pbv�j�6�B���/��-��oR���Y��"f�A(���L��q��"v�r�pd�Y1Ӻr	� ��7����V9���)#�?�8HӐ�l����j#����0��h8K� �1K���i��C?��o8C^��W�Jʧ�h���4���r8�D�����g<�M�o��TM��:ۘ��e��eĠfR� ��a,�RZS,��e@p���Bm7v�j�0TU�;�6c��P�Fc��Gc�����0vl�����(i,�4v�ĝ��c���Yf����o;�m:E䴪�;�G��R��*kG��;y6�j�|hmқ8FC�E�8��T$�E�$�9^���<�ot�~$��'t�5C~�+}�)���_�=��&=��l��� �#
'ò ���n�����j&w���������xs �����Nq�|�~t|�G�<0���*R{?�"��Fg�q0�g)����j�x�����0X�G7>(�p�S�_�I�    K�f
r	S*�2p���M��{�)�f�����|l��9^\�d��0_0+�υ���{P���T��H�й���N�dE�.�Фd�ّg����/���2����xCآ �c��<�Ƿ婀��
�˱�{^�AU�ڈ����1Ō�w�ſ�9�8���4�Gu�����'�Dbe����F� ��'$藍K�/���;en=�YpF�N�$�1DM�C�M�J���ג��3[W?��İ'�H����ɞ��ɞjW���q�`AM�"TW���v�_T�.���d�,7j2[����=���_�%�v��ŃE�v��� ��2s��1��EC�>%�] ����s���%;M*
�E	�&�ة7H�&y}қ.�k���N	�X�(N
���J����姓X~�ɿ PR?�~��,��x��^2�#�t���))�	�l��Q�j�.��b��V��g^���I��XuJ�>P�Т�]n�������k�?��9�lp�X��Eu����
�p�9@�ΈW�y ��tk�GTJD����+��C���7����ϭC8R9W�����a<5>#]���`}�d��1��}c���P��٠3��X�{#$*{�mB�� ~��;8x�]P���Y���/��
���10��^��F_�Ϡ_� ���%l}��p�4C|�LTwz�Na�_�/�{N^2�{8��m���Z
�h��u�(����g��l��h~�5�H��� _�?�*��Q���Q�א�:�� �RE뼈�HJ���0�s����6��u�@�%�q���r�xI�H��*Ed��+.��q�>�j�=]�Z"��T�i�g{��V��XNƩ<!�s�yQfE&� _��A���e��e*,&ޢ�G��(��L~�k�2w��q0���اxڝ��V\�p9�kv9�M��r���2��ǩ�cO��Լʵ�M�VQ���ի�V��n �EYp2¼�r2ki�&m���O3`�f3���:`M8`�i*%�//�ɋ��w�)�7U�
�_�T��,���+�,�ѧ0,�kT�8�ݯQ�=P[��5�o�tϯQ1�	\�3�w�h��sZu>�bu����
�V�B�wN)���'(��B�5�X"��tn���A��Q� V�
�U*��~JETb����#�)+��W�� L	�MUe���r�ߦ��)�Eh]~�k�x���f Jx�t���P�aC�MKp�N��B�>!|3�Z����˸'2�T�L�[��s���w�9V�,Ki(l"��d���Wп�N��\�gqa��k]N}�PL�0?%��&����<�6J�9-œ�O ��)*w�����d ����H��p]��i�f$�6���W�zw+�u��u�*ǫf�'(#�#0��h�l�9]��4C��T9��|�Ʈ&#�j1r�`��"�)������9��h{����a�n�S�099Uj�;C՘�q%��s=\rQʮfT	�nlCX�^K����0��Sq�l=����>D��F�z}]7۳�ˉ�m��huԶ���4��TulŰ���Gh��x1�����i���v�@oݼ��leR|��[K� �JؕTW3JB0%�<}�Y#����f��Sq�Gh[B�sq�?-j_�����yu�%̻J�B� �`��ѷͮ�Tr�7֯h#e]B����J�#�m��ʡ�)�beRV�as��Ls[O��ۓ�f�V^������,έ��}��u�R����Do����4�*G��%z����5�v{YWa�:H>7/k�8XI�"��Z��v��J��c��(��d��R<�y���C�������y��jY�h�N,��R�%�)����p �.>�j3'��Z�&��ݘ��卓�jҝ�5%�m�e��SJ�SIQ÷�g�>Uq���Vܩ{Fk���-�y[����y*�����1�}�.�O��d����]:Z爴��iv�"`�����ݥ�H�Ώ��QCɡM���?=9<ꗐ���<bų�T 9�b�ev���zѱD�$U'O�^������Zw���͕������Rw�pV殲���qԢ��f�RJi�&�lfW�l�bV��4��șf-�����
g3��6?^s8��hL	f�p6����Z�@%�l��6s�6�X2[RAa+����� �����Հ6e�
�*�щ
�b1�\�S���	���*�3��߳
�a�N��Ae=t�M?Ci B�Ju��`��b�Yڧe��uz���Qt<5��[���:�!���������6SD����9��f�M���t.D���a܋pv�s�Ӵr2��d�0��4��P1AP��o���kPL^
t2xo��M�i��s��9��X&F�¶PI�)?u����06��i���WG��D��~��y��}�JS�U�m�� PRF��(�W�U�@��8���(PU�Z��� �o6�Fg.���8���/h����Dt�q��eٚ��xU]S��z~�7,� �1䧠��y��[f�c#�B�f��������P����UC*儭�O��(��|zl:K�x�̗A_n�0��Ɯ�g�(FP�/��^��0���_g�s�H]s�������Fx�Q�-��k�/�`�bM�A�P�6���}@�"b��k�@S���O�����1��xz!�M�Q�� )^#��`��C��� �}�S�"9r���ʛ�C/��9�Q��9I��!b��%���K9���ҏn`V��p�)53�w�*������9>S 3"Be>71)YM�� a�O�/��zL����^r��	0��Mf����q=t3J��|@�P~:�g!�2�"��iuu�3}�a|m ��`*�As�*��	�C� ��$F�+�4���=�X������;E���ȧQgI���B����)��5&�{��{��tК�����#�Z�LB��e��2�|{�ʓb����d�=���ɂ\�w�������?���^_�S/��1�~�^y7T��$y`��g@�ti��G�� E�ӌ����
ee�%I�G�m���J���'^�2m,P�Z�!Y�o�f�}�ͼ�G)��v(�M�
�Fvx9K�=��}`#H Ü�#v"��XB���K�~��RL��1�,�f�Ќ�<�h�畈r�
e~��)�*��/�=h~���etX:+�y����#΍��0�Q��v�f4$�0	2�����Q�� I�T��B�fq$���'x��2���o �H2����,2��1���;<�����~ze�g����u|��寠1��ْ�$r���4����%�da�}�'�Ҍ{�y`��V6�}�	�r2�$}5wX�	��SX6M�6��O:[�X^ 9A�/Rl]5Z����>|Ç����q� �g˄��S�<JdN� ^�)T,���XF��H^_���Z]�k����EU�m���?zQ�j �#U�8��p�;��9D �a��kTUY�W�t�LC��j���n[/��c����`�nik�X�'�!��ANXk��5�Uk3y�k����I���S����ժt��k�z���n��`�k���^d��ҭ*9a�\[$,�PX�_����Q��Q��_���ݫx�a����۸+�-3o�q(7q�q8�������f�ƣ,Z$����	j�	{�g[��$��U��-�I�a�0pπ,�H�����s�u�<R!�(CA����7w�z�>x�#�#����H�D���}��57?R���A����v\��ƢvE!���tc�B��Z-���:.�D�l�UK3P���+���X��t���:	z04[)��1 �Y~�Z' N���P�*
�U������r�m���c~�ߙ��ܫ�6\���5S]����q�,cA��H�bAw%��<�G�g�]��4�2~j����{P��ɃD7��"*H�j�(��L��u����3-��8j�f�7���ӝ�ػN٥w���i�8@����_C(.i����k^�i(�jqhv݊V���/�mJZ�p�_e+Z{���:W��]͕�h��{���jE�2�M[�n �  ߜ��=d�gR�~6��N�ͅN��݈����5U-q�"[:�����E����=�+����-S�w�����<2��	�ņ��Z�FU�p�ҍȴT��&�tmQQ�ot��D����	,�}����"s���y~aH_���/�x�{c�bfs�\+-)�ڌ=��赫�� ����Úi�HD��R}�kdr��'��Ç���0�Yy�s�A3CU)D\_$�K �F��ܴ,�a�/� �Atq�ٞx�~_@|��{Mi��H_kz���y3~+_�iS�1
������Z��(_�%a���b���hoU�� ��BE��-g��S@/�S���hX��}��αP���B�YL����B�	�.q�yR(�oWT� u�]���VtPаWٷ����8�]ڷ��r5;����r5D3�9��Iٚ�mʖ�	�
B%�M��f���Z#�i�6@�_q�ݔ�t@M���j�T,��z�]����^�P�
k�$*Q��Y{S��k�X��%k��k��pf@��<�����j�.j�Tj���^�����=�q��ϋ	�.�EVB�d~cY1QJ�ᱶ6/'I�~-��^��U��:��b}E5�Z�=�Iκj f�2r8�vl)�#1v�Oh�:�;?��'ך��D\�'��D[��n�w0�}z���lGEt��ː������x�#Q�gWo�c5���bF�y�0WF^U��Խ��P���.�#&�լ`&!�+�'�'������#"�
��.���%��l�J�'���8\�2����4��D|�����)�F�1ʕ|��Q�҂.�P�kc>@���#�ق��k�X�'2��ݮ��h�n�TT�) ��r�PM%�\�QN%/�Bi����[i��w�8���j�P���*�Q��8�FV�?�{'��,��Z��hr���Y�Œ6���/T����|�kڰ��|@:���uv>�X��2�����&��Jq�93������b����skw0�#
���:������+\愓-~ �-ڹ���|��27�6�%����jg��VZz+rY+��)L�]W�SQ]_�6��`�Y�ujZZ��a��V�k���hZn�i;T�#΋��t����r�_�5�IC� ���?b`@����BK΂aO�h5yE	v>%��?���p[:������ �U:h  #�OI�|��5��7S�#��i:/z���t�ł��./{�*����'��4�ݲl�Ǆ�.*V�(���'�h������^��x�5�e�o��f�M�\�LQk�]�y. 4��i�Ka�+i<�F��< �$Z�4��O�p��'�ap�wK}�kH%�I�X�� ̀Მ$��
?X�����Z����G/���^	G���m0����y�T`9�a�V��D� �<)��9{�hO�	�o���������Jv J�G��!��@��v�_�\��v�n���7���Z��P���g ܗ�b���<�Pm��Zd���SS$S%Ǵ:o�Жwh�3�����r�[��I�D���b�O.ݠ�V����Gۮv�#��R�pQN9�ϕaV����ӓa�l��s�D&�j:2��s�����vzz�$��;==����@ ��V�>O�s��<i����6�Ffo�-�f ����鏞N�kk�=4؏U� �ok�i2�5�?�����?i���;����-���uB ��@��@�I9�ݭj���Q�_�%�b�Vs��>Ӝe�"��g�ye?#p��Z���vE"*�<f��J?�]JD쥟��*C��Q�r���E?�5JCT���F��m�6�q�0�t�]=I߹q{�]cs��z��z��S3�0�yj���XZ0=]T�Փ�?�'��r�w�5������Ǔ�w��}��$};�n'�ܦ���\���R�x%��+\��jW���,F�A�v*\�F�+wwi�]��	����,�7ٶ�Ć�0D�?�@��K�N`��@��4m����?�,��Q���a4S�t�4[�0��8�.�0�U�渻�#��{O��8�M�1�V��7۪���l	0�:c&s��]�0�����Z�'uK2�Բ���)th-°;&���E�tS�5�1G 	(=EO��B�k(�/n.����b��퉚�(�xH��\��������&g��b�h��ӈ�v���J�*
"wUO3u����vmuP��.�W����E���#��*51����(������Xy+�����V�e�=��aq>�>sQ�^�i�����b0s��(����Jz�:�m�{ޘ2�&B��s,��R�N�U��q����sn�g���3F���-���&A�g�p�L[9�r��+L�G�R;���t�F��h)ށ��8D�X�����3�E�ɑ�ߌ�nֳu�γu\3w3b:��TK��ɸ������S��іd�lup�p-O�iqP�$�u�Z�Sn�J�h�{�E�ƀ�a����
�+�6T�=iۦ�/:V��E\��t���5�b�,�qK٨�+���Tm�\���O��/��I������E�߰��DTq_�Ss*��Fu�9s��>ޜ��_1�֊>�O�/��}nz;sj� ��}��N3��ZP:�ay� �3�PX�X������U��ƣhiy�.T�LI#�DSk��9h��o�;5�k�"�E���.�훣��D�[�߭��V�\�o�$-*�y֌^��z��W�֐i�j��i 4b�����e�bC�u�/���p�
UUçI
��@{�@�%�?Tc����r����(?�b~����MZ�yXᶨ�*~v���9����j��:Ŗ�UI�mqa�$�g�ܢSl�荭jQ^���'�8���R�F�A <�(h�&~��F��:ElZ_9@#�S3R�rjv���FF���g��S�
c��\	��n�©���P3�q��i�*�r�#�+bXZK�9'se�;�c���k�Zg5�_�w͂��-��@�[s7N�^Q��C�n�2��:8h�5�Z���U7�~�?{������         �   x�}��N�0����4��8N���c/����ѡmB��� 1��j��~9)���w8| 9��&2��,���yG��
Y��n�f�5K8,ʮ+�ۗvU��1yE�	�Ԧ����u�87${��Hc �=���k��b���eo�#W���r�vM��s���s�j�1�t9b��8��®�O��+�wSDt<���?
3����ؠfL��>���]9	�#\�}3�JR�pYa�-M��;[U�'�s��            x������ � �            x��\Ms�6�>ÿbNyOf��C7E��d�D����V��#F��,��W���ݜ��Q�);��n<��F�Byv�6���W�]����]�V��$��5��Z	s��6��\������+|j�eW7��?Aa�=,�TW\�i�LB��������������f���i��zG� *�"L!��>��z�nʮj�o��~uW�_�uuX֬��/4��Go5�H�d�M�l�r���?����r�a9wѼ�!R��O; ޕ���V헦}��$u-
m����i��C��V+x�]��/�^=6W��z.#�c���k��=��Ӿ�7��\�B9�� )���'Pz��o�r��@�^q^����!���B`RK���r�������_I��z#M��c�F������/_NK� ���"^�1D�i���ǌ:-|U��P���m[U[��w�&�р��vib�i���-��8l� ��fv�>�n�ͮܮ>��-N�mcI)
'���,�!R��o}ׂ���L�Mn�K�V��N��]�!ҭٿ��U�'tX��;tm��4s���C4�g�4v�oZ |Ӕ�*������i��z�n�]7x�������x��<+�9C�۱e�XU_��V2��+�G�}�j�~�ASu����mw>5�PHe�Z"Ł�>�]��K��ٷ�}L�W��[��P���]۬��y����0�q�m�R��R.8�1D:�P���G�]TjT��~��"�̬Z���:;���⪀�=��ޘ@�Z��w[X8�׾=T��>��1�SP���Q>�c�tk6��m]�WO�zu��qϤ��aq�87�	D���mz��V�VeKA���-hW�0�;����v���0�<ݛ�k�m����ڃ�jm��9�H�cw���1[�ƙ���<�x��i�`!%���bR�2Eκ���i�,�~��F'�֨�q㢭1�P���Ǫ�����|xh�I�&@��X�y�H�?�;�;w�F!�`�Ѫ�!Rp�U������R�!��9Lc�~x*����W<6x�;��b<�z��S�fe�%D+�T�!�N��?@��%�}x��I�pji��3D����T���#p?O&��w[W�T!���3dCզi�~wpx�����`�������F��!!��
���6�`h%�u_7���W����Ê�,X��s,悇����}_���A�A����M-��5� �E�&C�XyȐ�Bid���)�����^�VH)��JB��� �~8E��р�����s�\�V��X�Z��Db�`f�4F���Z,P����8�m�=6�f��j��$� ^CC���"�5�4M��Q�]`j'���?��Y�x'F,H"IG��!�p��zgi�@���9�}���c�sǑF�r�����;G��q�ғ�!=:?H���h]��4��oMWBH7r����h}3��G�	ܗN*�3cy�Ƭ6蝛uO��m۫=E�iJ���O��,O�8#C4K���T̀�2�^6c^K�ѣ����)���GQ�B�	z��ڶX����<))�VHERDe��+_ŭ����#AU� ��@�2y��s���Dz	�m�^��'����4��ʎ��I(���BYBt�!���{�-�b�Qf��(�\��&�A0�̾��sΠ�~x)
� �����^��,�l��l�qM,O�I�<%<��W�	#�C�@0?�a�!eY7m�������0x�<���� D6�pt�����u}[eW`��{�?�|q�u$D	*2�1Dѻ`�� Q��~���Aab�c6��&	Y�e����+a�:�x)���]�˄�z� %iY����,�dѷSܸ(iC�J�����	���s��8n��i�L��![8b�p~������M[~�>���fli�?K�Qxi���S&!nه�P�a��B�)�N�q�i(�N���nFr��̓\E�!�Q)bL9Υ�V���ǂs�8mο'K�	v
�ܜC9��	D��0[��I����؜��(��E�rn?9@�r]�Xy��1B�Ҭ��A��h����N�C*�E �xJE�4����K[o*��ҍ%��.qB{��p����!W*3{J,7��n[U_�[�IH��='�SɁSd4S��4s�5���g�]�M9�#o��fJ*H>)(]L0�4rliUt�1��Q�lO�����d��tZb6�(:��g��E�S ��h��Q�?�p\�tc���a��K�'�,�J+�{�	D��ݗ�]ݕ�\(��:J�g2I*Ax)�>����������i��0-)?��쇣Ec.�#cC����ݏgi�5@�ǍN��9vi�P&���4 �<D���^���l1��2�X�9�0���h�"�PҐk�f�VМ�ί�f�gsVi��3�d�Ƃ�0��$�ݷ窥y~_��]�5C�m"��,K���W�K���b���Cو�K����d��F�����c�[9�pa��`�jGR�h8xY)W�<�;�P���m�wd�r��m����K�:N�y�9Ȃd�z��O�F'�@|]���YX�4W'��T�ult{?�p`� x�vX��[���1���4DRI*�C�ǣ�|� �޶�fw1)�R[��Ώ'��@��pp�>@��׃'���ɨ 	F�I�$9#
n�BdcɅ�Ml.K�H�ϫ�2c�k#p�~��'n��P��7Y��%�$!��*p�	AL������o��v[�_~�^0'o�ZvV�@qa�	�"��1���)���;8�+<�o����D.�! �d��d�,�:�JDK9���f���=0��2{LC.������!(�B������;OM�-��m�������L'�K�Q�c�Mp�Hc�X���U/����a��X�K��h�G-�8]>?Sm��~������kK�K$����й��N *�Hӽ�Z�
���c���VJN�:!�,NIS`��BE�;B����X٩�W/+g:̗O�X4Y��ʤ���@�ʱ��Ղ'i��C���sW=�Up�p�o��InJ;��	C�I@���R��m�;��z��c�%%^��Ca&�9V_ � 9�X)�c�zkp�7Y6�{Kl�"I��Gb�H0���F���?ں����}\�D�.t�%޻Y�F���@�ѰOu�aC���P:��Ĕ�}�b�$8& ֳ!����m�Q7l����y�P��,/����:�ap\s���mG	(���B�X�y:Z����k�Ue�A�˹E�$%���2��<g7���{� ���9>�ք�k8�\��aũ	�z���o�fO9��I�5�ӱs���9z!5	v4�`?�~kv��?��bck� �9���4%�y�3u0��1�B��ݭ ���N��MB.ut�<��t,�$�u�r.Z�1��4����ŷ"�+.���(8�uc:����x���1ؗ~x����`���T]y!�yƂ#ev	�Z���N�|ތ!�fٛ�����>[��>T���T�(�q��9�@tW}�����/��:1���u,�$���Gĝ��xv�+׏Tx�V�C:���&���2����J�-�����=���cw�܋@H���H�������8���5�U�b��u�?�n�U��tf�ђg2�"��P�_E�Wc�x�Gy���r�PYX�%F�.2)���&���O��v�P���N���s�1\ٹX�nBo��z�'��^�~a_J�h����h�oD��"6��=��j�7�~'Mp�ͅ&��@�+������'u���c�Z����S��D,�F�B;�b�C�̹�R�O����i2�xE}�s������G��	D\�|�zG�/k-�;.�"��7`f '�i�!bg��������T�:,+^�����VJ	'�i,�p���3���;�����>����F�O,�d�$nd�5M b$�-�"�XT{i�����|� ��#y��r�	��h` 7  _�=�!S���6��n(��b���R������^Ds6�����j��,�[Ԁ��M��eQ����@HK�_J��P�Y^����yf2	
g@��YiH����./t���2��Nd�4��Z	vt=���b�����g�g�T�i(��d5�I�0�M��K�1�44��V?]��6z��:=�X���(��@8����6��Ւ�&��ˍq$7��iX����řr��_�6Y��y˨��1�}7{��;}��&em���yV�8
]b�$)li�Y?����d2��x	1�W�@���
}'�z{���]����8�$�5��y���u�\j�+S��e�d_�0���	D�
?u����s���In����1�f���R�~�O������,����ߗ��y����c�}���#�8]a����`�P��O�	D��^ۻ/�<㼣�=���#Vڴ�V,t�!�0���j�}?���?z)ĳ�QkzJ8�cd,~���n�	D�ǳ;�+4�1�{�)w�_�
��m)*O	'��s�ͣ*�f�.^�z�?:N�y          �  x�e��n�@����)��k6�	����BY�*����ጇ�4}�m���'�~�4��$�J1:V�'�{@z�E�o��g�$�bLL9hv�di�E�H�Mb3���VԬ�{o<Ĵ��(�e�Պ^�y��;`�-��1��iV>��r�IBuV����T�(��Y�[�ϛb|ғ��������6�Y	5>R�6�@.C.MwFn{�6�-���[y��$J�_����[�SAGU�^���xqBgn]��*��x��F;��S�zP���H��e+���i3 �Я��ٶgqPܼ�;�g�]�@��j�~Ş@WaH�1�y;�ϳ���sm�fk?V_M�goLn�$k3�sYOD���	���~'��slk���c+x�U�a� a�1(�T���\���ɜ�����DA�Y��      9   @  x�Œ1o�0����^a��8�l@��K��lH(M�*8�qh������t�����w�%�@��
k[�%HD���GP���TL�TY��jz@8���n�Mi�澄Y~�xU{���l��ǂ�`�<Rc�(R}�h�׎��T�+Ž	�w��6��`)�[
R-�% �b}�/��,�����]��+�m��Q���7�a�я@��<[�I}�lq�N�Mr���|�v��������;�`)�S�X/3!�kLڝ�gbCQ[GG=4�.ZO��	�� ��RM_�O��M��X���dv�c��k�&�-���Ւ�`�}��      "   M  x���_o�0ş/#﫰��J�EU�Vb���/X�-�Eݴ�� �X;��c��{���RR �0r�����M��*�E��H�_z�q�^���5PIi��>�Ԙʶ�qY�J��ZU� 8��J}��ӣ>��� =y?���H���ب�iOS���i��ue�|ka��ڔK�/���'ؙJ[�'�Mֹqሃ���D>�S�;�'��L��f���˝���xi_W���!��ܑ�ٶx�? �4v�2>��Yi���)4��zf[9�D^C~��k.D,î�~��w��j_���'^?��G�=��4�Mb����G��x*�y��I3G82�S�@<]ٸ�s��;*�h4��4᥀H)�.�5S���"Jf�~�~���		���PT�A���8yX�\�*?Ɍ����.�<l>�͍�����S�����7������d�w�f�)��V[k���W�1�"@�4M���,6�@��Ag���� d�I)aZ�f�s|M�=PE�hv��#�31�RHy� o3��kU�`���'�)QM�fV�>�C�F]�����Re��I��I�v`�onlc���y�:      1   6  x�}�MO�0��鯰vޢ|'���Bₐ*��q(Mօ�M�u��{������ů�絩DL�(��0����������v�-��a���ݕ����Y���D�	��$�K�G/V��Y8�]{���Cэ�E=�y�]3��om}�r���|;f���`��H�pM�� �����7E�Tj��)a1�]5{C{o]8S����DD���b;ƪ؂=��S�����Tj��D�Dp�%��@�ǿ<s�b�J+ܵ~)�Ɂ��y���Y�Y����c\囄�D��2�&�p���Ɵ"��%���Nȏk      $   �  x���_o�:Ưͧ�U�I��N��Lm	퀝jӤ�M��IZ�O���ld�Ti�/�v���<6�1�(�)_�Cʆ�`��B�9I�D:"Mm�l���@K[�I[U��۰�����G�_�#1�����8�g�y�a�븈�4U��D2·E����g������P6�� �R���)Z5��-�3�@Y�{0e�4��&t�g�6��.��X�k���~�`��u9-�3ڻ/����c1�}��ɧ��=-ve�iw��χ3�	4��Om��ʨ1!��j@��0�R@և�"LF�2%ю�m(~�̮n.��k�l�w~�WeJgu��� uR��P&�H�2@�)��I��_��^�9�:�����3��L�38rl7ZT\*���t�V�9����Nt��)�\%�Wn4r#r�bL	�-����jq���a��r�߽����x��u�� W���xb|?�B�iJ��4i��OR`.��h�v&�ڟN��w`�y��#h�Eq���Rދ�7�#J��R�]�����
��d	h\ W��`�� ������2){�?����l\)�
��Y��83G�� 8�ۖ�����gmո
NY��|^9o�[_Du��O*�?v��m���g��Ѣ��gC�b$��eC�=�]	R�T�fȺ4���Ǫޙ�G�uh�ep�6E]��!�_sr/�k�~g}���:������E)�C�:a����6�����|��.h|�      &   �  x���ko�8�?{~�[�J�%����Od��R��n�:�8����ęR�g�-[��b)�������)����PɅVBs��$��Y	�r�%�a�Jvf2��/�2:��xU��O����Y�g��V�zўO�_��yv�w�8���U��e��Ye[�u�(!���~�}j��n�7m����"�Ō1B� ���7U���B����ߪ�@�~�7����\�?~����[B����i����	c���k_������"��t�!	\0_B�2X.m{�{�U��|x���_^aƪ3���X�j�ܔ��'ܨ����W�7/-�v0/�F%�}���"
�ƩNc��@S����*Q�������ғ�dVg��7A4��_"���]�HR���\���蜠(u78"�)C!�)i8�J+$�I
���2j���- m�/���&�ix�t>�y6K���ͪ{y&�C�����2?�����˃�G��.<�{W\��P�)Įo7ʆт2`D�v���;��Z7d-�@7��6 �u/�Ļj�!����k���'Dz������}�rn[L;w�-�{T���D����wܹ�������5�	�\Ͱ�� ���m�,�Qqw� �?��hh���.�EMsM�р��P�7<ff�O	I�	9�9X{{���'�ؙ�n��n�P��P��G�8�K�xZYxò�������h�'ӫ      (   �  x���K��0�s�),��j�O�k{�%�]�P��)��Ǯ��k�n�R�K��y��1�{N~_]^�e�J������ݏ�����ф���Ӭ,��[q�����0��(0�/�Z�e����6ǣ����������=2.�N��\N�a�9��O\��x=�o7��0brª��%�X��wCz\?�^�@Mx���ߪ;�:P�=eF�~��I��N��x/f��tRZ�K�g���ҧqD��
�����W7e>�+f�aQ�r�@���;���I�l���׻Ke�"�C8ɏ�r�����e����	�b��Y��k�*`�r�]:��X��Uv>e��1A���}�Ji�on8jA��̏�?��A�����ġ��hC���Qn�����]�9Sh6�Ƕ�\��9����S��؂$<]p��T��M��AL�YTV���􅳭���r��g�~;@[�oH!� �oS���"&|&���Rqr!:s~���ڋ�|"���I��      *   l   x�3�42�v�450�30�4202�5��54�H�K��K�4426153��4�tJ��V�OSp�M-�LN��M��Sp*J�K΀�40R04�2��2��j5�0�#����� A�     